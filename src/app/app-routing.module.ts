import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityWeatherDetailsComponent } from './components/city-weather-details/city-weather-details.component';
import { HomePageComponent } from './components/home-page/home-page.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'weather-details', component: CityWeatherDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
