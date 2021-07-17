import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { Mock } from 'ts-mockery';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherData } from '../modals/weather.modal';

const currentWeather: WeatherData = {
  "base": "stations",
  "clouds": {
    "all": 0
  },
  "cod": 200,
  "coord": {
    "lon": -0.1257,
    "lat": 51.5085
  },
  "dt": 1626445382,
  "id": 2643743,
  "main": {
    "feels_like": 298.68,
    "humidity": 53,
    "pressure": 1027,
    "temp": 298.69,
    "temp_max": 300.13,
    "temp_min": 296.45
  },
  "name": "London",
  "sys": {
    "type": 2,
    "id": 268730,
    "country": "GB",
    "sunrise": 1626408125,
    "sunset": 1626466238
  },
  "timezone": 3600,
  "visibility": 10000,
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "wind": {
    "speed": 4.63,
    "deg": 0
  }
};
const mockForecastResponse = {
  "city": {
    "coord": {
      "lat": 34.257,
      "lon": -85.1647
    },
    "country": "US",
    "id": 4219762,
    "name": "Rome",
    "population": 0,
    "sunrise": 1626432029,
    "sunset": 1626483155,
    "timezone": -14400
  },
  "cnt": 5,
  "cod": "200",
  "list": [
    {
      "base": "stations",
      "clouds": {
        "all": 0
      },
      "cod": 200,
      "coord": {
        "lon": -0.1257,
        "lat": 51.5085
      },
      "dt": 1626445382,
      "id": 2643743,
      "main": {
        "feels_like": 298.68,
        "humidity": 53,
        "pressure": 1027,
        "temp": 298.69,
        "temp_max": 300.13,
        "temp_min": 296.45
      },
      "name": "London",
      "sys": {
        "type": 2,
        "id": 268730,
        "country": "GB",
        "sunrise": 1626408125,
        "sunset": 1626466238
      },
      "timezone": 3600,
      "visibility": 10000,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "wind": {
        "speed": 4.63,
        "deg": 0
      }
    }
  ],
  "message": 0
};
describe('WeatherService', () => {
  let service: WeatherService;
  let forecastService: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WeatherService, {
          provide: WeatherService,
          useValue: Mock.of<WeatherService>({
            getCurrentWeather: (value: any) => value
          })
        }
      ]
    });

    const mockHttpCurrentWeather = Mock.of<HttpClient>({
      get: () => of(currentWeather)
    })
    let mockHttpForecast = Mock.of<HttpClient>({
      get: () => of(mockForecastResponse)
    })
    service = new WeatherService(mockHttpCurrentWeather);
    forecastService = new WeatherService(mockHttpForecast);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(forecastService).toBeTruthy();
  });

  it('should check default openCity value', () => {
      expect(service.openCity).toEqual('2643743');
  });

  it('should check getCurrentWeather() is loading or not', () => {
    service.getCurrentWeather('london').subscribe(response => {
      expect(response).toEqual(currentWeather);
    });
  });

  it('should check getForecast() is loading or not', () => {
    forecastService.getForecast(2643743, 5).subscribe(response => {
      expect(response).toEqual(mockForecastResponse);
    });
  });

});
