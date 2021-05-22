import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject();
  isFuture = true;
  futureOrders: Order[] = [];
  pastOrders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getUserOrders(localStorage.getItem('id'))
      .pipe(takeUntil(this.notifier$))
      .subscribe((orders: Order[]) => {
        this.futureOrders = orders.filter((order: Order) => order.seance.startTime > moment().unix());
        this.pastOrders = orders.filter((order: Order) => order.seance.startTime < moment().unix());
      });
  }

  ngOnDestroy() {
    this.notifier$.next();
  }

  showFutureOrders() {
    this.isFuture = true;
  }

  showPastOrders() {
    this.isFuture = false;
  }
}
