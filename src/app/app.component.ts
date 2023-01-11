import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { WeatherService } from './services/weather.service';
import { Console } from 'console';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  autocompleteStatus1: any;
  worldTimeDataFromApi: any;
  cityBackground: string = "";
  currentConditionBackground: string = "";
  currentDate = new Date();
  myControl = new FormControl('');
  selectedCity: string = "";
  dayOfWeek: string = "";
  daysOfWeek: string [] = ["Sunday", "Monday", 'Tuesday', 'Wednesday', "Thursday", "Friday", "Saturday"];
  cities: string[] = ["Amsterdam", "Berlin", "Bern", "Brussels", "Budapest", "Copenhagen", "Dublin", "Helsinki", 
  "London", "Madrid", "Oslo", "Paris", "Prague", "Rome", "Stockholm", "Warsaw", "Zagreb"];
  
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
  weatherDataFromAPI: any;

  constructor(private WeatherService: WeatherService) { }

  ngOnInit() {
    // this.syncTimeWithAPI();
    this.autocompleteStatus1 = 0;
    this.selectedCity = "Warsaw";
    this.setBackground2(this.selectedCity);
    this.currentConditionBackground = '../assets/cloudyBackgroundBlur.jpg';
    this.clock();
    this.getWeatherDataFromAPI('Warsaw');
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
      let dayOfWeek = d.getDay();
      this.dayOfWeek = this.daysOfWeek[dayOfWeek];
  },1000)
}

  // Get weather data
  getWeatherDataFromAPI(target: string){
    this.WeatherService.getWeatherData(target).subscribe((data :any) => {
    this.weatherDataFromAPI = data;
    console.log("this.weatherDataFromAPI", this.weatherDataFromAPI);
    })
  }

  autocomplete1_confirm(data: string){
    console.log("this.selectedCity", data);
    this.selectedCity = data;


    // set background for box1R2
    this.setBackground2(this.selectedCity);
    this.autocompleteStatus1 = 0;
    return this.selectedCity;
  }

  getInput1(data: any){
    console.log("input1val: ", data);
  }

  showAutocomplete1(){
    console.log("show autocomplete");
    this.autocompleteStatus1 = 1;
  }

  hideAutocomplete1(){
    console.log("hide autocomplete");
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

}




