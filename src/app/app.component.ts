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
  autocompleteStatus: any;
  input1Value: any;
  input1ValFilter: any;

  cities: string[] = ['Warszawa', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz'];

  ngOnInit() {
  }

  autocomplete1_confirm(data: any){

  }

  getInput1(data: any){
    console.log("input1val: ", data)
  }





}



