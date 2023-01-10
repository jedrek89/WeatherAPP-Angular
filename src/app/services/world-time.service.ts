import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorldTimeService {

  constructor(private http: HttpClient) { }

  // getTimeFromAPI(){
  //   return this.http.get("API_URL/europe/berlin");
  // /europe/berlin
  // };

timeFromAPI: any;
param: string = "Berlin";

getTimeFromAPI(){
  this.http.post("/.netlify/functions/worldTimeAPI", this.param ).subscribe(response => 
    {
          this.timeFromAPI = response;
          console.log("API response", this.timeFromAPI);
        }, (error) => {
          console.log('error in getWeatherData: ', error);
        })
        return this.timeFromAPI;
};

}
