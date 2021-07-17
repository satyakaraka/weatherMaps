import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { City, WeatherData, WeatherDetails } from '../../modals/weather.modal';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-city-weather-details',
  templateUrl: './city-weather-details.component.html',
  styleUrls: ['./city-weather-details.component.scss']
})
export class CityWeatherDetailsComponent implements OnInit, OnDestroy {
  getCityWeatherDetailsSub = new Subscription;
  isErrorOccured: boolean = false;
  errorMessage: string = '';
  weatherCityDetails: City;
  fiveDaysWeatherDetails: Array<WeatherData> = [];
  openedCityID: number;
  days: number = 5;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.openedCityID = Number(this.weatherService.openCity);
    this.getCityWeatherDetailsSub = this.weatherService.getForecast(this.openedCityID, this.days).subscribe((res: WeatherDetails) => {
      this.weatherCityDetails = res?.city;
      this.fiveDaysWeatherDetails = res?.list;
      this.isErrorOccured = false;
    }, () => {
      this.isErrorOccured = true;
      this.errorMessage = 'No Weather Details Found';
      this.getCityWeatherDetailsSub.unsubscribe();
    })
  }

  goBackToHome() {
    this.weatherService.openCity = '';
  }

  ngOnDestroy() {
    this.getCityWeatherDetailsSub?.unsubscribe();
  }
}
