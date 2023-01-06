import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  currentDate = new Date();
  myControl = new FormControl('');
  autocompleteStatus1: any;
  input1Value: any;

  cities: string[] = ['Warszawa', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz'];

  ngOnInit() {
    this.autocompleteStatus1 = 0;
  }

  autocomplete1_confirm(data: any){
    console.log("chosed otpion", data);
    this.autocompleteStatus1 = 0;
    this.input1Value = data;
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
    this.autocompleteStatus1 = 0;
  }



}



