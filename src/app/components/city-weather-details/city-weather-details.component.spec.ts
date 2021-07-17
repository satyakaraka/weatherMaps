import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Mock } from 'ts-mockery';
import { of } from 'rxjs';
import { WeatherDetails } from '../../modals/weather.modal';
import { CityWeatherDetailsComponent } from './city-weather-details.component';
import { WeatherService } from '../../services/weather.service';
import { By } from '@angular/platform-browser';

const mockForecastResponse: WeatherDetails = {
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
describe('CityWeatherDetailsComponent', () => {
  let component: CityWeatherDetailsComponent;
  let fixture: ComponentFixture<CityWeatherDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CityWeatherDetailsComponent ],
      providers: [
        WeatherService, {
          provide: WeatherService, HttpClient,
          useValue: Mock.of<WeatherService>({
            getForecast: () => of(mockForecastResponse)
          })
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityWeatherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isErrorOccured).toBeDefined(false);
    expect(component.days).toBeDefined(5);
    expect(component.errorMessage).toBeDefined('');    
  });

  it('should check goBackToHome() loading or not', () => {
    spyOn(component, 'goBackToHome');
    component.goBackToHome();
    fixture.detectChanges();
    expect(component.goBackToHome).toHaveBeenCalled();
  });

  it('should check that openedCityID value', () => {
    expect(component.openedCityID).toEqual(NaN);
  });

  it('should check city name in weatherCityDetails', () => {
    component.openedCityID = 2643743;
    fixture.detectChanges();
    expect(component.weatherCityDetails.name).toEqual('Rome');
  });

  it('should check fiveDaysWeatherDetails length', () => {
    component.openedCityID = 2643743;
    fixture.detectChanges();
    expect(component.fiveDaysWeatherDetails.length).toEqual(1);
  });

  it('should unsubscribe when ngOnDestroy() called', () => {
    spyOn(component, 'ngOnDestroy');
    Mock.extend(component.getCityWeatherDetailsSub).with({ unsubscribe: () => true });
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toHaveBeenCalled();
  });

  it('should check weather-details-wrapper is loading or not', () => {
    const fixture = TestBed.createComponent(CityWeatherDetailsComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.weather-details-wrapper'))).not.toBe(null);
  });

  it('should check card is loading or not', () => {
    const fixture = TestBed.createComponent(CityWeatherDetailsComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.card'))).not.toBe(null);
  });

  it('should check H3 content is loading or not', () => {
    const h3Element: HTMLElement = fixture.nativeElement;
    const h3Text = h3Element.querySelector('h3')!;
    expect(h3Text.textContent).toEqual('Weather Details of Rome, for next 5 days');
  });

  it('should check Back Button content is loading or not', () => {
    const backButtonElement: HTMLElement = fixture.nativeElement;
    const backButton = backButtonElement.querySelector('.back-button')!;
    expect(backButton.textContent).toEqual('Back to Home');
  });
});
