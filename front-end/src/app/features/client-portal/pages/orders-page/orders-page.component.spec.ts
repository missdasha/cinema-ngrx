import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderService } from '../../services/order.service';

import { OrdersPageComponent } from './orders-page.component';

fdescribe('OrdersPageComponent', () => {
  let ordersPageComponent: OrdersPageComponent;
  let fixture: ComponentFixture<OrdersPageComponent>;
  let ordersPage: HTMLElement;

  beforeEach(async () => {
    const orderService = jasmine.createSpyObj('OrderService', ['getUserOrders']);
    orderService.getUserOrders.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [ OrdersPageComponent ],
      providers: [{ provide: OrderService, useValue: orderService}]
    });
    fixture = TestBed.createComponent(OrdersPageComponent);
    ordersPageComponent = fixture.componentInstance;
    ordersPage = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should change isFuture variable to false after showPastOrders()', () => {
    ordersPageComponent.showPastOrders();
    expect(ordersPageComponent.isFuture).toBeFalse();
  });

  it('should change isFuture variable to true after showFutureOrders()', () => {
    ordersPageComponent.isFuture = false;
    fixture.detectChanges();
    ordersPageComponent.showFutureOrders();
    expect(ordersPageComponent.isFuture).toBeTrue();
  });

  it('should show message if there is no futureOrders', () => {
    const message = ordersPage.querySelector('.message');
    expect(message.textContent).toBe('У Вас нет новых заказов');
  });

  it('should show message if there is no pastOrders', () => {
    ordersPageComponent.showPastOrders();
    fixture.detectChanges();
    const message = ordersPage.querySelector('.message');
    expect(message.textContent).toBe('У Вас нет истории заказов');
  });
});
