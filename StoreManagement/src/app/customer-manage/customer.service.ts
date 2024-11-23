import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustInformation } from '../StoreEntity/CustInformation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpClient) { }
  private baseUrl = 'https://localhost:7015/Store';

  CustomerActions(info: CustInformation): Observable<CustInformation[]> {
    return this.httpService.post<CustInformation[]>(`${this.baseUrl}/CustomerActions/`, info).pipe();
  }
}
