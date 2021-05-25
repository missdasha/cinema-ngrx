import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';
import { Service } from '../../../core/models/service.model';
import { messages } from '../../../core/сonstants/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  pathToOrders = 'orders/';
  pathToNewOrder = '/new';

  constructor(private http: HttpClient) { }

  postOrder(order) {
    const servicesIds = order.services.map((service: Service) => service._id);

    const servicesWithQuantity: { [key: string]: number } = { };
    servicesIds.forEach((id: string) => {
      if (servicesWithQuantity[id]) {
        servicesWithQuantity[id]++;
      }
      else {
        servicesWithQuantity[id] = 1;
      }
    });

    const services: Array<{ amount: number, service: string }> = [];
    Object.entries(servicesWithQuantity).forEach(([service, amount]) => {
      services.push({ service, amount });
    });

    const body = {
      userId: order.userId,
      seance: order.seance._id,
      seats: order.seats,
      totalCost: order.totalCost,
      services
    };

    this.http.post(`${environment.baseUrl}${this.pathToOrders}${order.userId}${this.pathToNewOrder}`, body)
      .subscribe(
        (info: { message: string, data: string }) => {
          alert(messages[info.message]);
        },
        (e) => {
          if (e.error) {
            alert(messages[e.error.message]);
          }
          else {
            alert('Извините, произошла ошибка');
            console.error(e);
          }
        }
      );
  }

  getUserOrders(id: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.baseUrl}${this.pathToOrders}${id}`);
  }
}
