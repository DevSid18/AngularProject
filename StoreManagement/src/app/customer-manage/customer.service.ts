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

  GetAllCustomers(id: number): Observable<CustInformation[]> {
    return this.httpService.post<CustInformation[]>(`${this.baseUrl}/CustomerDetails` + id, null);
  }
  AddCustomer(info: CustInformation): Observable<string> {
    return this.httpService.post<string>(`${this.baseUrl}/AddCustomer`, info).pipe();
  }
}
