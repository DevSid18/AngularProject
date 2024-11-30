import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private geonamesUrl = 'http://api.geonames.org/'; // GeoNames API base
  private geonamesUsername = 'DevDhanu16';  // Your GeoNames username
  private countriesUrl = `${this.geonamesUrl}countryInfoJSON?username=${this.geonamesUsername}`;

  constructor(private http: HttpClient) { }
  
  getCountries(): Observable<any> {
    return this.http.get<any>(this.countriesUrl).pipe();
  }

  getStates(countryId: string): Observable<any> {
    const url = `${this.geonamesUrl}childrenJSON?geonameId=${countryId}&username=${this.geonamesUsername}`;
    return this.http.get<any>(url).pipe(
      tap(response => {
        console.log('Response from API in Service:', response);
      })
    );
  }

  // getCities(stateCode: string): Observable<any> {
  //   const url = `${this.geonamesUrl}searchJSON?geonameId=${stateCode}&username=${this.geonamesUsername}`;
  //   return this.http.get<any>(url);
  // }
  
  getCities(stateCode: string, countryCode: string): Observable<any> {
    const url = `${this.geonamesUrl}searchJSON?adminCode1=${stateCode}&country=${countryCode}&username=${this.geonamesUsername}&maxRows=50`;
    return this.http.get<any>(url).pipe(
        tap(response => {
            console.log('Response from API for cities:', response);
        })
    );
}

  




}
