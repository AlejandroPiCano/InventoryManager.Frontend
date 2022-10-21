import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryItem } from '../../shared/models/InventoryItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryAppService { 
  readonly apiUrl: string = 'http://localhost:61408/api/InventoryItems';

  allInventoryItems: InventoryItem[] = [];

  // Constructor
  constructor(private http: HttpClient) {}
  
  // Crud Operations
  GetInventoryList(): Observable<any> {
    // this.http.get(this.apiUrl).subscribe((res) => {
    //   this.allInventoryItems = res as InventoryItem[];
    // });

    return this.http.get(this.apiUrl);      
  }

  CreateInventoryItem(name: string, type: number, expirationDate: Date): Observable<any> {
    return this.http
      .post(this.apiUrl, new InventoryItem(0, name, type, expirationDate )) ;          
  }

  UpdateInventoryItem(item: InventoryItem) : Observable<any> {
   return this.http.put(`${this.apiUrl}/${item.id}`, item);
  }

  DeleteInventoryItem(name: string) : Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteByName/${name}`);
  }
}
