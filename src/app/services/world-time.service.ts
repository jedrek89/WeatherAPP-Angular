import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorldTimeService {

  constructor(private http: HttpClient) { }

  getTimeFromAPI(){
    return this.http.get("https://worldtimeapi.org/api/timezone/europe/berlin");
  };

}
