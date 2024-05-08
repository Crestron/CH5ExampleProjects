// This is the structure of the weather data that is returned from the OpenWeather API.
// The json data was passed to https://transform.tools/json-to-typescript to generate the typescript interfaces automatically.
// Duplicate classes were then removed / merged to create the final structure.

export class OpenWeatherData {
  lat!: number;
  lon!: number;
  timezone!: string;
  timezone_offset!: number;
  current!: Current;
  minutely!: Minutely[];
  hourly!: Current[];
  daily!: WeatherDetail[];
}

export interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  // Hourly Only
  pop: number;
}

export interface Minutely {
  dt: number;
  precipitation: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// Covers the daily / hourly / minutely weather data
export interface WeatherDetail {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  uvi: number;
  rain: number;
  snow: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}
