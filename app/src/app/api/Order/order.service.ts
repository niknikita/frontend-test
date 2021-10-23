import { Injectable } from '@angular/core';
import { Order } from './order';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({ providedIn: "root" })
export class OrderService {
  orders: Order[] = [
    {
      "id": 1,
      "name": "Иванов Сергей",
      "phone": "+79996665412",
      "brandCarId": 6,
      "modelCarId": 118,
      "governmentNumbers": "р 111 ррр",
      "timeOrder": new Date("2021-10-22T10:00:00")
    },
    {
      "id": 2,
      "name": "Скворцов Тимофей Георгиевич",
      "phone": "+79896545432",
      "brandCarId": 4,
      "modelCarId": 91,
      "governmentNumbers": "в234пав",
      "timeOrder": new Date("2021-10-22T12:00:00")
    },
    {
      "id": 4,
      "name": "Соловьев Дмитрий Алексеевич",
      "phone": "+79553114545",
      "brandCarId": 24,
      "modelCarId": 359,
      "governmentNumbers": "а623про",
      "timeOrder": new Date("2021-10-22T16:00:00")
    },
    {
      "id": 5,
      "name": "Богданов Всеволод Львович",
      "phone": "+79793214565",
      "brandCarId": 46,
      "modelCarId": 618,
      "governmentNumbers": "р555ппт",
      "timeOrder": new Date("2021-10-23T13:00:00")
    }
  ];
  private static baseUrl = `${environment.apiUrl}/Order`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    // return this.http.get(`${OrderService.baseUrl}`) as Observable<Order[]>;
    return of<Order[]>(this.orders);
  }
  getOrderById(id: number) : Observable<Order[]> {
    return this.http.get(`${OrderService.baseUrl}/${id}`) as Observable<Order[]>;
  }

}
