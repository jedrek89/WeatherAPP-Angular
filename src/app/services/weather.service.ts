import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  exampleVar: number = 0;
  weatherData: any;
  param = {
    target: '',
  }

getWeatherData(target: string){
  this.param.target = target;
  this.http.post(`/.netlify/functions/getWeatherData`, this.param).subscribe(response => 
    {
      this.weatherData = response;
      console.log("API response in serrvice:", response)
    }, (error) => {
      console.log('error in getWeatherData: ', error);
      return error;
    })
    return this.weatherData;
  };

}

// getWeatherData(target : string){
//   this.param.target = target;
//   this.http.post(`/.netlify/functions/getWeatherData`, this.param).subscribe(response => 
//     {
//       console.log(response);
//       return response;
//     }, (error) => {
//       console.log('error in getWeatherData: ', error);
//       return error;
//     })
//   };