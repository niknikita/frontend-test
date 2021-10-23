import { Injectable } from '@angular/core';
import { Brand } from './brand';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: "root" })
export class BrandService {
  private static baseUrl = `${environment.apiUrl}/Brand`;
  private brands: Brand[] = [{"id":1,"brandName":"Acura"},{"id":2,"brandName":"Alfa Romeo"},{"id":3,"brandName":"Aston Martin"},{"id":4,"brandName":"Audi"},{"id":5,"brandName":"Bentley"},{"id":6,"brandName":"BMW"},{"id":7,"brandName":"Brilliance"},{"id":8,"brandName":"Bugatti"},{"id":9,"brandName":"Buick"},{"id":10,"brandName":"BYD"},{"id":11,"brandName":"Cadillac"},{"id":12,"brandName":"Changan"},{"id":13,"brandName":"Chery"},{"id":14,"brandName":"Chevrolet"},{"id":15,"brandName":"Chrysler"},{"id":16,"brandName":"Citroen"},{"id":17,"brandName":"Dacia"},{"id":18,"brandName":"Daewoo"},{"id":19,"brandName":"Daihatsu"},{"id":20,"brandName":"Datsun"},{"id":21,"brandName":"Dodge"},{"id":22,"brandName":"Dongfeng"},{"id":23,"brandName":"FAW"},{"id":24,"brandName":"Ferrari"},{"id":25,"brandName":"Fiat"},{"id":26,"brandName":"Fisker"},{"id":27,"brandName":"Ford"},{"id":28,"brandName":"Foton"},{"id":29,"brandName":"GAC"},{"id":30,"brandName":"GAZ"},{"id":31,"brandName":"Geely"},{"id":32,"brandName":"Genesis"},{"id":33,"brandName":"GMC"},{"id":34,"brandName":"Great Wall"},{"id":35,"brandName":"Haval"},{"id":36,"brandName":"Holden"},{"id":37,"brandName":"Honda"},{"id":38,"brandName":"Hummer"},{"id":39,"brandName":"Hyundai"},{"id":40,"brandName":"Infiniti"},{"id":41,"brandName":"Isuzu"},{"id":42,"brandName":"Iveco"},{"id":43,"brandName":"Jac"},{"id":44,"brandName":"Jaguar"},{"id":45,"brandName":"Jeep"},{"id":46,"brandName":"Kia"},{"id":47,"brandName":"Lamborghini"},{"id":48,"brandName":"Lancia"},{"id":49,"brandName":"Land Rover"},{"id":50,"brandName":"Lexus"},{"id":51,"brandName":"Lifan"},{"id":52,"brandName":"Lincoln"},{"id":53,"brandName":"Lotus"},{"id":54,"brandName":"Marussia"},{"id":55,"brandName":"Maserati"},{"id":56,"brandName":"Maybach"},{"id":57,"brandName":"Mazda"},{"id":58,"brandName":"McLaren"},{"id":59,"brandName":"Mercedes"},{"id":60,"brandName":"Mercury"},{"id":61,"brandName":"MG"},{"id":62,"brandName":"Mini"},{"id":63,"brandName":"Mitsubishi"},{"id":64,"brandName":"Nissan"},{"id":65,"brandName":"Noble"},{"id":66,"brandName":"Opel"},{"id":67,"brandName":"Peugeot"},{"id":68,"brandName":"Plymouth"},{"id":69,"brandName":"Pontiac"},{"id":70,"brandName":"Porsche"},{"id":71,"brandName":"Ravon"},{"id":72,"brandName":"Renault"},{"id":73,"brandName":"Rolls-Royce"},{"id":74,"brandName":"Rover"},{"id":75,"brandName":"Saab"},{"id":76,"brandName":"Saturn"},{"id":77,"brandName":"Scion"},{"id":78,"brandName":"Seat"},{"id":79,"brandName":"Skoda"},{"id":80,"brandName":"Smart"},{"id":81,"brandName":"Ssang Yong"},{"id":82,"brandName":"Subaru"},{"id":83,"brandName":"Suzuki"},{"id":84,"brandName":"Tesla"},{"id":85,"brandName":"Toyota"},{"id":86,"brandName":"UAZ"},{"id":87,"brandName":"VAZ"},{"id":88,"brandName":"Volkswagen"},{"id":89,"brandName":"Volvo"}]
  constructor(private http: HttpClient) {}

  getAll(): Observable<Brand[]> {
    // this.http.get(`${BrandService.baseUrl}`, {withCredentials: true}) as Observable<Brand[]>;
    return of<Brand[]>(this.brands)
  }
  getBrandById(id: number) : Observable<Brand[]> {
    // return this.http.get(`${BrandService.baseUrl}/${id}`, {withCredentials: true}) as Observable<Brand[]>;
    return of<Brand[]>(this.brands.filter(f => f.id === id))
  }
}
