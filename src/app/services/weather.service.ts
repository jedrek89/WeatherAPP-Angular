import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }
}


// getFlightData(){
//   this.http.post(`/.netlify/functions/flightDataAPI`, flightParam).subscribe(response => 
//     {
//           flightDataFromAPI = response;
//           this.router.navigate(['/', 'search-results']);
//           console.log("API response", flightDataFromAPI);
//         }, (error) => {
//           console.log('error in getWeatherData: ', error);
//         })
//         return flightDataFromAPI;
// };