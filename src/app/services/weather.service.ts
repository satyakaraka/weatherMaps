import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../modals/weather.modal';
const apiKey: string = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  openCity: string = '2643743';

  constructor(private http: HttpClient) { }

  getCurrentWeather(loc: string) {
    return this.http.get<WeatherData>(`${environment.apiUrl}/weather?q=${loc}&appid=${apiKey}`);
  }
  getForecast(cityID: number, days: number) {
    return this.http.get(`${environment.apiUrl}/forecast?id=${cityID}&cnt=${days}&appid=${apiKey}`);
    // here cnt = 5 means getting forecast for 5 days
  }
}
