import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';


// add new data
interface ItemData {
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_time: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // backend server information
  apiURL = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getItemList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/items');
  }

  updateItem(itemId: number, item: any): Observable<any> {
    return this.http.put(`${this.apiURL}/items/${itemId}/`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/items/${id}/`);
  }

  addItem(item:ItemData): Observable<ItemData> {
    return this.http.post<ItemData>(this.apiURL +'/items/',item)
  }




}
