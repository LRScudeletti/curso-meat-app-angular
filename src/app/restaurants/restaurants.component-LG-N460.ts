import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { from } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})

export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[];

  searchBarState = 'hidden';
  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantsServices: RestaurantsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.formBuilder.control('');

    this.searchForm = this.formBuilder.group({ searchControl: this.searchControl });

    this.searchControl.valueChanges.pipe(debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => this.restaurantsServices.restaurants(searchTerm)
        .pipe(catchError(error => from([])))))
      .subscribe((restaurants: Restaurant[]) => this.restaurants = restaurants);

    this.restaurantsServices.restaurants().subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }
}