import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  control = new FormControl('');
  cities: string[] = ['Warszawa', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz'];
  filteredCities!: Observable<string[]>; // Compile error without !
  
  ngOnInit() {
    this.filteredCities = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.cities.filter(city => this._normalizeValue(city).includes(filterValue));
  }
  
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  }
