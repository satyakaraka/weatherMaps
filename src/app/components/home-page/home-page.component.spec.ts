import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Mock } from 'ts-mockery';
import { of } from 'rxjs';
import { WeatherData } from '../../modals/weather.modal';
import { HomePageComponent } from './home-page.component';
import { WeatherService } from '../../services/weather.service';
import { By } from '@angular/platform-browser';

const mockCurrentWeather: WeatherData = {
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
describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ HomePageComponent ],
      providers: [
        WeatherService, {
          provide: WeatherService, HttpClient,
          useValue: Mock.of<WeatherService>({
            getCurrentWeather: () => of(mockCurrentWeather)
          })
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isErrorOccured).toBeDefined(false);
  });

  it('should check selectedCities length', () => {
    expect(component.selectedCities.length).toEqual(5);
  });

  it('should check openWeatherDetails() loading or not', () => {
    spyOn(component, 'openWeatherDetails');
    component.openWeatherDetails(12345);
    fixture.detectChanges();
    expect(component.openWeatherDetails).toHaveBeenCalled();
  });

  it('should unsubscribe when ngOnDestroy() called', () => {
    spyOn(component, 'ngOnDestroy');
    Mock.extend(component.getCurrentWeatherSub).with({ unsubscribe: () => true });
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toHaveBeenCalled();
  });

  it('should check home-page-wrapper is loading or not', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.home-page-wrapper'))).not.toBe(null);
  });

  it('should check card is loading or not', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.card'))).not.toBe(null);
  });

  it('should check H3 content is loading or not', () => {
    const h3Element: HTMLElement = fixture.nativeElement;
    const h3Text = h3Element.querySelector('h3')!;
    expect(h3Text.textContent).toEqual('5 European Cities Weather Reports');
  });

  it('should check action link text is loading or not', () => {
    const actionElement: HTMLElement = fixture.nativeElement;
    const actionLinkText = actionElement.querySelector('.action')!;
    expect(actionLinkText.textContent).toEqual('View Details >');
  });
});
