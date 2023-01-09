import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { WorldTimeService } from './services/world-time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  autocompleteStatus1: any;
  worldTimeDataFromApi: any;
  cityBackground: string = ""; 
  currentDate = new Date();
  myControl = new FormControl('');
  selectedCity: string = "";
  dayOfWeek: string [] = ["Sunday", "Monday", 'Tuesday', 'Wednesday', "Thursday", "Friday", "Saturday"];
  cities: string[] = ["Warsaw", "London"];
  constructor(private WorldTimeService: WorldTimeService) { }

  ngOnInit() {
    this.autocompleteStatus1 = 0;
    this.WorldTimeService.getTimeFromAPI().subscribe((data: any) => {
      this.worldTimeDataFromApi = data
      console.log(this.worldTimeDataFromApi);
    });
  }


  autocomplete1_confirm(data: string){
    console.log("this.selectedCity", data);
    this.selectedCity = data;
    this.setBackground();
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
  }

  setBackground(){
    if (this.selectedCity == this.cities[0]) {
      this.cityBackground = '../assets/warsaw.jpg';
    }
    if (this.selectedCity == this.cities[1]) {
      this.cityBackground = '../assets/london.jpg'
    }
    return this.cityBackground;
  }



}

// setInterval(() => {this.time1 = dateTimeFromAPI.timeString}, 1000);

// export function clock(val1: number, val2: number, val3: number){
//   // increase seconds
//   val1++;
//   if (val1 == 60) {
//     val2++;
//     val1 = 0;
//   }
//   // increase minutes
//   if (val2 == 60) {
//     val3++;
//     val2 = 0;
//   }
//   // increase hours
//   if (val3 == 24) {
//     val3 = 0;
//   }
//   dateTimeFromAPI.secondInt = val1;
//   dateTimeFromAPI.minuteInt = val2;
//   dateTimeFromAPI.hourInt = val3;
//   let tempVal1;
//   let tempVal2;
//   let tempVal3;
//   (val1 < 10) ? tempVal1 = `0${val1}` : tempVal1 = val1;
//   (val2 < 10) ? tempVal2 = `0${val2}` : tempVal2 = val2;
//   (val3 < 10) ? tempVal3 = `0${val3}` : tempVal3 = val3;
//   // if value < 0 add 0 + val;
//   dateTimeFromAPI.timeString = tempVal3 + ":" + tempVal2 + ":" + tempVal1;
//   dateTimeFromAPI.dtTxt = (dateTimeFromAPI.date + " " + dateTimeFromAPI.timeString);
//   // return console.log("time in app components: ",dateTimeFromAPI);
//   return dateTimeFromAPI;
// }