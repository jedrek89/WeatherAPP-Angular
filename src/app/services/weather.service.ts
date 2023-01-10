import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  weatherData: any;
  param = {
    target: '',
  }

  getWeatherData(target : string){
    this.param.target = target;
    this.http.post(`/.netlify/functions/getWeatherData`, this.param).subscribe(response => 
      {
            this.weatherData = response;
            console.log("API response", this.weatherData);
          }, (error) => {
            console.log('error in getWeatherData: ', error);
          })
          return this.weatherData;
  };

}