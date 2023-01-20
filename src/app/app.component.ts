import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  fetchingDataStatus: number = 0;
  weatherDataFromAPI: any;
  autocompleteStatus1: any;
  cityBackground: string = "../assets/Warsaw.jpg";
  currentConditionBackground: string = "";
  currentDate = new Date();
  selectedCity: string = "";
  dayOfWeekNum: number = 0;
  dayOfWeekName: string = "";
  daysOfWeekName: string [] = ["Sunday", "Monday", 'Tuesday', 'Wednesday', "Thursday", "Friday", "Saturday"];
  cities: string[] = ["Amsterdam", "Berlin", "Bern", "Brussels", "Budapest", "Copenhagen", "Dublin", "Helsinki", "London", "Madrid", "Oslo", "Paris", "Prague", "Rome", "Stockholm", "Warsaw", "Zagreb"];
  allWeatherIcons: string[] = ['../assets/thunderstorm', '../assets/drizzle', '../assets/rain', '../assets/snow', '../assets/mist', '../assets/clear', '../assets/clouds']; 
  weatherIconsSet: string[] = ['../assets/clear', '../assets/clear', '../assets/clear', '../assets/clear', '../assets/clear'];
  weatherIconIdAPI: number[] = [];
  nextDayName: string [] = [];

  timeFromAPI = {
    utcDateTimeApi: '',
    dayOfWeekApi: 0,
    dateSliced: '',
    hoursSync: 0,
    hoursWithOffset: 0,
    timeString: '',
  }

  newDate = new Date();
  timeData: any;
  newDateOffset: number = 0;
  interval: any;

  constructor(private WeatherService: WeatherService) { }

  ngOnInit() {
    this.autocompleteStatus1 = 1;
    this.getWeatherDataFromAPI('Warsaw');
    this.cityBackground = "../assets/Warsaw.jpg";
    this.selectedCity = "Warsaw";
    this.clock();
    this.getNextDayName();
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

  clock() {
    this.interval = setInterval(() => {
    // set UTC offet for cities
    if (this.selectedCity == 'Helsinki') {
      this.newDateOffset = 2;
    }
    else if (this.selectedCity == 'Dublin' || this.selectedCity == 'London') {
      this.newDateOffset = 0;
    } else {
      this.newDateOffset = 1;
    }
      let timeData;
      let d = new Date();
      let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      let nd = new Date(utc + (3600000 * this.newDateOffset));
      timeData = nd.toLocaleString();
      this.timeData = timeData;
      this.dayOfWeekNum = nd.getDay();
      this.dayOfWeekName = this.daysOfWeekName[this.dayOfWeekNum];
  },1000)
}

  // Get weather data
getWeatherDataFromAPI(target: string){


  const promise = new Promise((resolve, reject) => {
    this.fetchingDataStatus = 1; 
    setTimeout(() => {
      this.WeatherService.getWeatherFromBackend(target).subscribe((data:any) =>{
        this.weatherDataFromAPI = data;
        this.setWetaherIcon();
        this.fetchingDataStatus = 0; 
      });  

      return this.weatherDataFromAPI;
      }, 500)
  })
  promise.then((success)=>{

  })
  .catch((error) => {
    console.log(error);
  });

};

  autocomplete1_confirm(data: string){
    this.autocompleteStatus1 = 0;
    this.selectedCity = data;
    // set background for box1R2
    this.setBackground2(this.selectedCity);
    // fetch data from API
    this.getWeatherDataFromAPI(this.selectedCity);
    return this.selectedCity;
  }

  getInput1(data: any){
  }

  showAutocomplete1(){
    this.autocompleteStatus1 = 1;
  }

  hideAutocomplete1(){
    (this.autocompleteStatus1 == 1) ? this.autocompleteStatus1 = 0 : "";
    return this.autocompleteStatus1;
  }

  // Set background for R1 of box
  setBackground1(){
    return this.currentConditionBackground;
  }

  // Set background for R2 of box
  setBackground2(cityName :string){
    this.cityBackground = `../assets/${this.selectedCity}.jpg`
    return this.cityBackground;
  }

  getNextDayName(){
    for (let index = 0; index < 4; index++) {
      let d = new Date();
      let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      let nd = new Date(utc + (3600000 * 24 * (index +1)));
      let dayOfWeek = nd.getDay();
      this.nextDayName[index] = this.daysOfWeekName[dayOfWeek];
    }
  }

  setWetaherIcon(){
    this.weatherIconIdAPI[0] = this.weatherDataFromAPI.list[0].weather[0].id
    this.weatherIconIdAPI[1] = this.weatherDataFromAPI.list[8].weather[0].id
    this.weatherIconIdAPI[2] = this.weatherDataFromAPI.list[16].weather[0].id
    this.weatherIconIdAPI[3] = this.weatherDataFromAPI.list[24].weather[0].id
    this.weatherIconIdAPI[4] = this.weatherDataFromAPI.list[32].weather[0].id
    for (let index = 0; index < this.weatherIconIdAPI.length; index++) {
      // Thunderstorm
      (this.weatherIconIdAPI[index] >= 200 && this.weatherIconIdAPI[index] <= 232) ? this.weatherIconsSet[index] = this.allWeatherIcons[0] : "";
      // Drizzle
      (this.weatherIconIdAPI[index] >= 300 && this.weatherIconIdAPI[index] <= 321) ? this.weatherIconsSet[index] = this.allWeatherIcons[1] : "";
      // Rain
      (this.weatherIconIdAPI[index] >= 500 && this.weatherIconIdAPI[index] <= 531) ? this.weatherIconsSet[index] = this.allWeatherIcons[2] : "";
      // Snow
      (this.weatherIconIdAPI[index] >= 600 && this.weatherIconIdAPI[index] <= 622) ? this.weatherIconsSet[index] = this.allWeatherIcons[3] : "";
      // Mist
      (this.weatherIconIdAPI[index] >= 701 && this.weatherIconIdAPI[index] <= 781) ? this.weatherIconsSet[index] = this.allWeatherIcons[4] : "";
      // Clear
      (this.weatherIconIdAPI[index] >= 800 && this.weatherIconIdAPI[index] < 801) ? this.weatherIconsSet[index] = this.allWeatherIcons[5] : "";
      // Clouds
      (this.weatherIconIdAPI[index] >= 801 && this.weatherIconIdAPI[index] <= 804) ? this.weatherIconsSet[index] = this.allWeatherIcons[6] : "";
    }
    return this.weatherIconsSet;
  }

}


