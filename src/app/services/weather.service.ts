import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherFromBackend(target : string): Observable<any> {
    return this.http.get<any>(`/.netlify/functions/getWeatherData?location=${target}`)
  }

}
