import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldTimeService {
  
  constructor(private http: HttpClient) { }
  url = "/.netlify/functions/worldTimeAPI";

getTimeFromAPI(): Observable<any> {
  return this.http.get<any>(this.url)
}

}
