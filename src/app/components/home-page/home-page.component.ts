import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherData } from '../../modals/weather.modal';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  getCurrentWeatherSub = new Subscription;
  selectedCities: Array<string> = ['Istanbul', 'Rome', 'Paris', 'London', 'Milan'];
  currentWeather: Array<WeatherData> = [];
  isErrorOccured: boolean = false;
  errorMessage: string = '';
  
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentWeather();
  }

  getCurrentWeather() {
    let tempWeather: Array<WeatherData> = [];
    this.selectedCities.forEach((city) => {      
      this.getCurrentWeatherSub = this.weatherService.getCurrentWeather(city).subscribe((res: WeatherData) => {
        tempWeather.push(res);
        this.isErrorOccured = false;
        this.errorMessage = '';
      }, () => {
        this.isErrorOccured = true;
        this.errorMessage = 'No Weather data Available';
        this.getCurrentWeatherSub.unsubscribe();
      });
      this.currentWeather = tempWeather;
    });
  }

  openWeatherDetails(id: number) {
    this.weatherService.openCity = id.toString();
  }

  ngOnDestroy() {
    this.getCurrentWeatherSub?.unsubscribe();
  }
}
