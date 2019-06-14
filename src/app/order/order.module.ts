
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';
import { SharedModule } from './../shared/shared.module';
import { LeaveOrderGuard } from './leave-order-guard';

const ROUTES: Routes = [
    { path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard] }
]

@NgModule({
    declarations: [OrderComponent, OrderItemComponent, DeliveryCostsComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})


export class OrderModule { }