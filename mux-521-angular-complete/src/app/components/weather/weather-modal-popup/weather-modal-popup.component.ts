import { Component,signal,Input,OnInit, OnDestroy } from '@angular/core';
import { OpenWeatherData } from '../../../../models/weather';
import { HeadingPipe } from '../../../pipes/heading/heading.pipe';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FadeInOutAnimation } from '../../../animations/animations';

enum Forecast {
  daily,
  hourly,
}

@Component({
  selector: 'app-weather-modal-popup',
  standalone: true,
  imports: [HeadingPipe,DatePipe,DecimalPipe],
  templateUrl: './weather-modal-popup.component.html',
  styleUrl: './weather-modal-popup.component.scss',
  animations: [FadeInOutAnimation],
})
export class WeatherModalPopupComponent implements OnInit, OnDestroy {
@Input() weatherData!:OpenWeatherData;
@Input() city!:string;

  active = signal(false);

  // The forecast type
  Forecast = Forecast;
  // The current forecast
  currentForecast = signal(Forecast.daily);

  // Handle for the timeout
  timerHandle!: any;
  
  ngOnInit(): void {
    // Clear the timer when the component is destroyed.
    clearTimeout(this.timerHandle);
  }

  ngOnDestroy(): void {
    // Clear the timer when the component is destroyed.
    clearTimeout(this.timerHandle);
  }

  public open() {
    this.active.set(true);
    clearTimeout(this.timerHandle);
    this.timerHandle = setTimeout(() => this.close(), 30000);
  }

  public close() {
    this.active.set(false);
    clearTimeout(this.timerHandle);
  }

  selectForecast(forecast: Forecast) {
    this.currentForecast.set(forecast);
  }
}
