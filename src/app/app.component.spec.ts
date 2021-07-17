import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Open Weather Maps'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Open Weather Maps');
  });

  it('should check selector content is loading or not', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.content'))).not.toBe(null);
  });

  it('should check header is loading or not', () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    const headerTitle = headerElement.querySelector('.header span')!;
    expect(headerTitle.textContent).toEqual('Open Weather Maps');
  });

  it('should check footer is loading or not', () => {
    const footerElement: HTMLElement = fixture.nativeElement;
    const footerCopyRight = footerElement.querySelector('.footer span')!;
    expect(footerCopyRight.textContent).toEqual('© 2021, kss.vasu86@gmail.com');
  });
});
