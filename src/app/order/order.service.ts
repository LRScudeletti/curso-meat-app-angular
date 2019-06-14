import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';


import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order } from './order.model';
import { MEAT_API } from '../app.api';

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService, private http: HttpClient) { }

    itemsValue(): number {
        return this.cartService.total();
    }

    cartItens(): CartItem[] {
        return this.cartService.items;
    }

    increaseQtd(item: CartItem) {
        this.cartService.increaseQtd(item);
    }

    decreaseQtd(item: CartItem) {
        this.cartService.decreaseQtd(item);
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item);
    }

    clear() {
        this.cartService.clear();
    }

    checkOrder(orderParam: Order): Observable<string> {
        return this.http.post<Order>(`${MEAT_API}/orders`, orderParam).pipe(map((order: Order) => order.id));
    }
}
