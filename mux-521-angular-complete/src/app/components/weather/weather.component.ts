import {
  Component,
  OnInit,
  NgZone,
  signal,
  computed,
  OnDestroy,
  viewChild,
} from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { OpenWeatherData } from '../../../models/weather';
import { HeadingPipe } from '../../pipes/heading/heading.pipe';
import { FadeInOutAnimation } from '../../animations/animations';
import { WeatherModalPopupComponent } from './weather-modal-popup/weather-modal-popup.component';

// Temporary API Key for testing (1000 calls per day limit).
// Will be deactivated after the project is complete.
const apiKey = '145bb2f5e2aab2c4aedbb3c32d0b3bc2';

// Define a coordinate type for the location of the weather data.
type Coordinates = { latitude: number; longitude: number };
// The location of the weather data (Orlando, FL).
const location: Coordinates = { latitude: 28.538336, longitude: -81.379234 };

enum Units {
  imperial,
  metric,
}

@Component({
  standalone: true,
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  imports: [HeadingPipe, DatePipe, DecimalPipe,WeatherModalPopupComponent],
  animations: [FadeInOutAnimation],
})
export class WeatherComponent implements OnInit, OnDestroy {
  // Reference to the weather modal popup.
  popup = viewChild<WeatherModalPopupComponent>('modalPopup'); 
  // Action to open the weather widget.
  visible = signal(false);

  // The location of the weather data.
  readonly city = 'Orlando, FL';

  compassStyle = computed(
    () => `rotate(${this.weatherData().current.wind_deg}deg)`);

  weatherData = signal(new OpenWeatherData());

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    // Lets go and get the weather data.
    // This could be run on a timer or in response to a user action (refresh button).
    this.fetchOpenWeatherData(location, Units.imperial, apiKey);
  }

  ngOnDestroy(): void {
  }

  /** Fetch Open Weather Data */
  fetchOpenWeatherData(coordinates: Coordinates, units: Units, apiKey: string) {
    fetch(
      // './assets/weather/data/weather-data.json'
      `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=${Units[units]}&appid=${apiKey}`
    )
      .then(
        (response) =>
          response.json() as Promise<OpenWeatherData>
      )
      .then((data) => {
        this.ngZone.run(() => {
          this.weatherData.set(data);
          // Once the weather data has been populated, we can make the widget visible.
          this.visible.set(true);
        });
      })
      .catch((error) => {
        // Log any errors to the console
        console.error(error);
      });
  }

  open() {
    this.popup()?.open();
  }
}
