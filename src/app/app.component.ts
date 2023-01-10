import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { WorldTimeService } from './services/world-time.service';
import { Console } from 'console';

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
  dayOfWeek: string [] = ["Sunday", "Monday", 'Tuesday', 'Wednesday', "Thursday", "Friday", "Saturday"];
  cities: string[] = ["Amsterdam", "Berlin", "Bern", "Brussels", "Budapest", "Copenhagen", "Dublin", "Helsinki", 
  "London", "Madrid", "Oslo", "Paris", "Prague", "Rome", "Stockholm", "Warsaw", "Zagreb"];
  timeFromAPI = {
    utcDateTimeApi: '',
    dayOfWeekApi: 0,
    dateSliced: '',
    hoursSync: 0,
    minutesSync: 0,
    secondsSync: 0,
    timeString: '',
  }
  interval: any; // set interval function
  timeOffset: number = 0;

  constructor(private WorldTimeService: WorldTimeService) { }

  ngOnInit() {
    this.autocompleteStatus1 = 0;
    this.selectedCity = "Warsaw";
    this.currentConditionBackground = '../assets/cloudyBackgroundBlur.jpg';
    this.syncTimeWithAPI();
    this.loop1s();
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

  loop1s() {
    this.interval = setInterval(() => {
    this.clock(this.timeFromAPI.secondsSync, this.timeFromAPI.minutesSync, this.timeFromAPI.hoursSync, this.timeOffset)

  },1000)
}

  // Get date & time from API UTC+1 Berlin/Warsaw
  syncTimeWithAPI(){
    this.WorldTimeService.getTimeFromAPI().subscribe((data: any) => {
      console.log(data);
      this.timeFromAPI.utcDateTimeApi = data.message.utc_datetime;
      this.timeFromAPI.dayOfWeekApi = data.message.day_of_week;
      this.timeFromAPI.hoursSync = data.message.utc_datetime.slice(11, 13);
      this.timeFromAPI.minutesSync = data.message.utc_datetime.slice(14, 16);
      this.timeFromAPI.secondsSync = data.message.utc_datetime.slice(17, 19);
      console.log("this.timeFromAPI", this.timeFromAPI);
    });
    return this.timeFromAPI;
  }

  autocomplete1_confirm(data: string){
    console.log("this.selectedCity", data);
    this.selectedCity = data;
    this.setBackground2();
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
  setBackground2(){
    this.cityBackground = `../assets/${this.selectedCity}.jpg`
    return this.cityBackground;
  }



  clock(val1: number, val2: number, val3: number, val4: number){
    // increase seconds
    val1++;
    if (val1 == 60) {
      val2++;
      val1 = 0;
    }
    // increase minutes
    if (val2 == 60) {
      val3++;
      val2 = 0;
    }
    // increase hours
    if (val3 == 24) {
      val3 = 0;
    }
    this.timeFromAPI.secondsSync = val1;
    this.timeFromAPI.minutesSync = val2;
    this.timeFromAPI.hoursSync = val3;
    let tempVal1;
    let tempVal2;
    let tempVal3;
    (val1 < 10) ? tempVal1 = `0${val1}` : tempVal1 = val1;
    (val2 < 10) ? tempVal2 = `0${val2}` : tempVal2 = val2;
    (val3 < 10) ? tempVal3 = `0${val3}` : tempVal3 = val3;
    // if value < 0 add 0 + val;
    this.timeFromAPI.timeString = tempVal3 + ":" + tempVal2 + ":" + tempVal1;
    // dateTimeFromAPI.dtTxt = (dateTimeFromAPI.date + " " + dateTimeFromAPI.timeString);
    // // return console.log("time in app components: ",dateTimeFromAPI);
    console.log("this.timeFromAPI.timeString", this.timeFromAPI.timeString);
    return this.timeFromAPI;
  }
}




