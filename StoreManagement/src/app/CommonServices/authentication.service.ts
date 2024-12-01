import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../StoreEntity/LoginModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl = 'https://localhost:7015/Authorization';

  ProcessToLogin(loginInfo: LoginModel): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/Authentication`, loginInfo).pipe();
  }
}
