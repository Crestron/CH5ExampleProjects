import React, { useState, useEffect } from 'react';
import styles from './Weather.module.scss';
import FullScreenModal from '../FullScreenModal/FullScreenModal';
import { format } from 'date-fns';
// Assuming OpenWeatherData is similar structure in React app.
import { OpenWeatherData } from './Weather.structure';

// Temporary API Key for testing.
const apiKey = '145bb2f5e2aab2c4aedbb3c32d0b3bc2';
type Coordinates = { latitude: number; longitude: number };
const location: Coordinates = { latitude: 28.538336, longitude: -81.379234 };

interface WeatherState {
    location: string;
    condition: number;
    icon: string;
    temperature: number;
    precipitation: number;
    wind: number;
    title: string;
    description: string;
    wind_direction: number;
}

enum Units {
    imperial,
    metric,
}

enum Forecast {
    daily,
    hourly,
}

// The headings array is used to convert the bearing to a compass heading.
const headings: string[] = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
];

const WeatherComponent: React.FC = () => {
    const [city, setCity] = useState('Orlando, FL');
    const [currentForecast, setCurrentForecast] = useState(Forecast.daily); // Assuming 'daily' and 'hourly' are the two possible states
    const [weatherData, setWeatherData] = useState(new OpenWeatherData());

    /* ----------------------------------------------------------------------------------------------------------------------------- */
    /* TODO - Exercise 6.1: Create a state for temperature, precipitation, wind speed, wind direction, description & icon
    /* ----------------------------------------------------------------------------------------------------------------------------- */
    const [weather, setWeather] = useState<WeatherState>({
        location: 'Orlando, FL',
        condition: 800, // default condition to avoid undefined errors
        icon: '01', // default icon
        temperature: 0,
        precipitation: 0,
        wind: 0,
        title: 'Loading...',
        description: '',
        wind_direction: 0,
    });

    const [isModalVisible, setIsModalVisible] = useState(false)

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    /* -------------------------------------------------------------------------------------------------------- */
    /* TODO - Advanced Exercise: Create a computed style to rotate the compass icon to match the wind direction */
    /* TODO - Advanced Exercise: Bind the style to the compass icon in the html template                        */
    /* HINT: - The standard method to create a computed signal is: 'name = computed(() => value)'               */
    /* -------------------------------------------------------------------------------------------------------- */
    // Custom hook for converting degrees to compass heading
    function compassHeading(degrees: number): string {
        const index = Math.round(degrees / 22.5) % 16;
        return headings[index];
    }

    useEffect(() => {
        fetchOpenWeatherData(location, Units.imperial, apiKey);
    }, []);

    const fetchOpenWeatherData = (coordinates: Coordinates, units: Units, apiKey: string) => {
        console.log("WeatherComponent -> fetching weather data...");
        fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=${units}}&appid=${apiKey}`
        )
            .then(response => response.json() as Promise<OpenWeatherData>)
            .then(data => {
                console.log("WeatherComponent -> set");
                setWeatherData(data);

                /* ------------------------------------------------------------------------------------------------------------------ */
                /* TODO - Exercise 6.2: Save the appropriate values from our received data to each signal for binding to the template */
                /* ------------------------------------------------------------------------------------------------------------------ */
                setWeather({
                    ...weather,
                    temperature: Math.round(data.current.temp),
                    condition: data.current.weather[0].id,
                    icon: data.current.weather[0].icon,
                    title: data.current.weather[0].main,
                    wind_direction: data.current.wind_deg,
                    description: data.current.weather[0].description,
                    precipitation: Math.round(data.daily?.[0].pop * 100),
                    wind: Math.round(data.current.wind_speed),
                });
            })
            .catch(error => console.error(error));
    };

    return (
        <>
            <div className={styles["weather-widget"]} onClick={toggleModal}>
                <div className={styles["weather-widget__forecast"]}>
                    <div className={styles["forecast__row"]}>
                        <div className={styles["forecast__item"]}>
                            <img
                                className={styles["forecast__icon"]}
                                src="./weather/icons/temperature.svg"
                                alt="Temperature"
                            />
                            {/* ----------------------------------------------------------------------------------------------
                             TODO - Exercise 6.4: - Bind to the temperature
                             Bonus: adding a decimal pipe will round the number  : {{value | number : "1.0-0" }}
                            --------------------------------------------------------------------------------------------- */}
                            <span className={styles["forecast__label"]}>
                                {new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(weatherData?.current?.temp)}°
                            </span>
                        </div>
                        <div className={styles["divider"]}></div>
                        {/* ----------------------------------------------------
                         TODO - Exercise 6.5: - Bind to the description
                        --------------------------------------------------- */}
                        <span className={styles["weather-widget__description"]}>{weatherData?.current?.weather[0]?.description}</span>
                    </div>
                    <div className={styles["forecast__row"]}>
                        <div className={styles["forecast__item"]}>
                            <img className={styles["forecast__icon"]} src="./weather/icons/umbrella.svg" alt="Precipitation" />
                            {/* ------------------------------------------------------------------------------------------------
                             TODO - Exercise 6.6: Add the probability of precipitation (multiply by 100 to get percent)
                            ------------------------------------------------------------------------------------------------ */}
                            <span className={styles["forecast__label"]}>
                                {new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(weatherData?.daily?.[0]?.pop)}%
                            </span>
                        </div>
                        <div className={styles["divider"]}></div>
                        <div className={styles["forecast__item"]}>
                            <img className={styles["forecast__icon"]} src="./weather/icons/wind.svg" alt="Wind Speed" />
                            {/* ---------------------------------------------
                             TODO - Exercise 6.7: Add the wind speed
                            --------------------------------------------- */}
                            <span className={styles["forecast__label"]}>
                                {new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(weatherData?.current?.wind_speed)} <small>mph</small>
                            </span>
                        </div>
                        <div className={styles["divider"]}></div>
                        <div className={styles["forecast__item"]}>
                            <span className={styles["forecast__label"]}>
                                {/* ----------------------------------------------------------------------------------------------------
                                 TODO - Advanced Exercise 6.8: Add a transform (rotate) to set our compass to the wind direction
                                ---------------------------------------------------------------------------------------------------- */}
                                <img
                                    className={styles["compass__icon"]}
                                    style={{ transform: `rotate(${weather.wind_direction}deg)` }}
                                    src="./weather/icons/compass.svg"
                                    alt="Wind Direction"
                                />
                                {/* --------------------------------------------------------------
                                 TODO - Exercise 6.9: Add the heading using a custom pipe
                                 Hint to add the heading pipe: {{value | heading}}
                                -------------------------------------------------------------- */}
                                <span>{compassHeading(weatherData?.current?.wind_deg)}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <img
                    className={styles["weather-widget__forecast-icon"]}
                    src={`./weather/conditions/${weather.condition}d.webp`}
                    alt="Weather Condition"
                />
            </div>
            <FullScreenModal visible={isModalVisible} onClose={toggleModal}>
                {/* Content for the full-screen modal, e.g., detailed weather information */}
                <div className={styles["weather-app"]}>
                    <div className={styles["weather-app__container"]}>
                        {isModalVisible && (
                            <>
                                <div className={styles["weather-app__current"]}>
                                    <span className={styles["weather-app__current--title"]}>
                                        {city}
                                    </span>

                                    <div className={styles["weather-app__current-forecast"]}>
                                        <div className={styles["weather-app__current-forecast--icon"]}>
                                            <img src={`./weather/conditions/${weatherData?.current?.weather[0]?.id}d.webp`} alt='' />
                                        </div>

                                        <div className={styles["weather-app__current-forecast__detail"]}>
                                            <span className={styles["weather-app__current-forecast__detail--description"]}>
                                                {weatherData?.current?.weather[0]?.description}
                                            </span>

                                            <div className={styles["weather-app__current-forecast__stats"]}>
                                                <span>
                                                    {new Intl.NumberFormat('en-US', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0
                                                    }).format(weatherData?.current?.temp)}°
                                                </span>

                                                <div className={styles["weather-app__current-forecast__stats--column"]}>
                                                    <div className={styles["weather-app__current-forecast__stats--row"]}>
                                                        <img src="./weather/icons/maximum-temperature.svg" alt='' />
                                                        <span>
                                                            {new Intl.NumberFormat('en-US', {
                                                                minimumFractionDigits: 0,
                                                                maximumFractionDigits: 0
                                                            }).format(weatherData?.daily?.[0]?.temp.max)}°
                                                        </span>
                                                    </div>
                                                    <div className={styles["weather-app__current-forecast__stats--row"]}>
                                                        <img src="./weather/icons/minimum-temperature.svg" alt='' />
                                                        <span>
                                                            {new Intl.NumberFormat('en-US', {
                                                                minimumFractionDigits: 0,
                                                                maximumFractionDigits: 0
                                                            }).format(weatherData?.daily?.[0]?.temp.min)}°
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className={styles["weather-app__current-forecast__stats--column"]}>
                                                    <div className={styles["weather-app__current-forecast__stats--row"]}>
                                                        <img src="./weather/icons/umbrella.svg" alt="Precipitation" />
                                                        <span>
                                                            {new Intl.NumberFormat('en-US', {
                                                                minimumFractionDigits: 0,
                                                                maximumFractionDigits: 0
                                                            }).format(weatherData?.daily?.[0]?.pop)}%
                                                        </span>
                                                    </div>
                                                    <div className={styles["weather-app__current-forecast__stats--row"]}>
                                                        <img src="./weather/icons/humidity.svg" alt="Humidity" />
                                                        <span>
                                                            {new Intl.NumberFormat('en-US', {
                                                                minimumFractionDigits: 0,
                                                                maximumFractionDigits: 0
                                                            }).format(weatherData?.current?.humidity)}%
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className={styles["weather-app__current-forecast__stats--column"]}>
                                                    <div className={styles["weather-app__current-forecast__stats--row"]}>
                                                        <img src="./weather/icons/wind.svg" alt="Wind Speed" />
                                                        <span>
                                                            {new Intl.NumberFormat('en-US', {
                                                                minimumFractionDigits: 0,
                                                                maximumFractionDigits: 0
                                                            }).format(weatherData?.current?.wind_speed)} <small>mph</small>
                                                        </span>
                                                    </div>
                                                    <div className={styles["weather-app__current-forecast__stats--row"]}>
                                                        <img
                                                            className={styles["compass__icon"]}
                                                            style={{ transform: `rotate(${weather.wind_direction}deg)` }}
                                                            src="./weather/icons/compass.svg"
                                                            alt="Wind Direction"
                                                        />
                                                        <span>{compassHeading(weatherData?.current?.wind_deg)}</span>
                                                    </div>
                                                </div>

                                                <div className={styles["weather-app__current-forecast__stats--column"]}>
                                                    <div className={styles["weather-app__current-forecast__stats--row"]}>
                                                        <img src="./weather/icons/cloud.svg" alt="Cloudiness" />
                                                        <span>
                                                            {new Intl.NumberFormat('en-US', {
                                                                minimumFractionDigits: 0,
                                                                maximumFractionDigits: 0
                                                            }).format(weatherData?.current?.clouds)} %
                                                        </span>
                                                    </div>
                                                    <div className={styles["weather-app__current-forecast__stats--row"]}>
                                                        <img src="./weather/icons/pressure.svg" alt="Atmospheric Pressure" />
                                                        <span>
                                                            {weatherData?.current?.pressure}
                                                        </span>
                                                    </div>
                                                </div>


                                                <div className={styles["weather-app__current-forecast__stats--column"]}>
                                                    <div className={styles["weather-app__current-forecast__stats--row"]}>
                                                        <img src="./weather/icons/sunrise.svg" alt="Sunrise Time" />
                                                        <span>
                                                            {weatherData?.current?.sunrise ? format(new Date(weatherData.current.sunrise * 1000), 'HH:mm') : ''}
                                                        </span>
                                                    </div>
                                                    <div className={styles["weather-app__current-forecast__stats--row"]}>
                                                        <img src="./weather/icons/sunset.svg" alt="Sunset Time" />
                                                        <span>
                                                            {weatherData?.current?.sunrise ? format(new Date(weatherData.current.sunset * 1000), 'HH:mm') : ''}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'grid' }}>
                                        {currentForecast === Forecast.daily && (
                                            <ul id="daily-forecast-pane" className={styles['weather-panes']}>
                                                {weatherData?.daily.map((forecast: any, index: any) => (
                                                    <li className={styles['weather-panes__item']} key={index}>
                                                        <div className={styles['weather-panes__item--title']}>
                                                            {index === 0 ? 'Today' : new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                                                        </div>
                                                        <div className={styles['weather-panes__item--icon']}>
                                                            <img src={`./weather/conditions/${forecast.weather[0].id}d.webp`} alt='' />
                                                        </div>
                                                        <span className={styles['weather-panes__item--description']}>
                                                            {forecast.weather[0].main}
                                                        </span>
                                                        <div className={styles['weather-panes__item--divider']}></div>

                                                        <div className={styles['weather-panes__item__detail']}>
                                                            <div className={styles['weather-panes__item__detail--row']}>
                                                                <div className={styles['weather-panes__item__detail--value']}>
                                                                    <img src="./weather/icons/maximum-temperature.svg" alt='' />
                                                                    <span>{Math.round(forecast.temp.max)}°</span>
                                                                </div>

                                                                <div className={`${styles['weather-panes__item__detail--value']} fade`}>
                                                                    <img src="./weather/icons/minimum-temperature.svg" alt='' />
                                                                    <span>{Math.round(forecast.temp.min)}°</span>
                                                                </div>
                                                            </div>
                                                            <div className={styles['weather-panes__item__detail--value']}>
                                                                <img className={styles['weather-panes__item--small-icon']} src="./weather/icons/umbrella.svg" alt='' />
                                                                <span>{Math.round(forecast.pop * 100)}%</span>
                                                            </div>

                                                            <div className={styles['weather-panes__item__detail--value']}>
                                                                <img
                                                                    className={styles['weather-panes__item--small-icon']}
                                                                    style={{ transform: `rotate(${forecast.wind_deg}deg)` }}
                                                                    src="./weather/icons/compass.svg"
                                                                    alt=''
                                                                />
                                                                <span>{Math.round(forecast.wind_speed)} <small>mph</small></span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {currentForecast === Forecast.hourly && (
                                            <ul id="hourly-forecast-pane" className={styles['weather-panes']}>
                                                {weatherData?.hourly.map((forecast: any, index: any) => (
                                                    <li className={styles['weather-panes__item']} key={index}>
                                                        <div className={styles['weather-panes__item--title']}>
                                                            {new Date(forecast.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                        <div className={styles['weather-panes__item--icon']}>
                                                            <img src={`./weather/conditions/${forecast.weather[0].id}d.webp`} alt='' />
                                                        </div>
                                                        <span className={styles['weather-panes__item--description']}>
                                                            {forecast.weather[0].main}
                                                        </span>
                                                        <div className={styles['weather-panes__item--divider']}></div>

                                                        <div className={styles['weather-panes__item__detail']}>
                                                            <div className={styles['weather-panes__item__detail--row']}>
                                                                <div className={styles['weather-panes__item__detail--value']}>
                                                                    <img src="./weather/icons/maximum-temperature.svg" alt='' />
                                                                    <span>{Math.round(forecast.temp)}°</span>
                                                                </div>

                                                                <div className={styles['weather-panes__item__detail--value']}>
                                                                    <img src="./weather/icons/cloud.svg" alt='' />
                                                                    <span>{forecast.clouds}%</span>
                                                                </div>
                                                            </div>
                                                            <div className={styles['weather-panes__item__detail--value']}>
                                                                <img className={styles['weather-panes__item--small-icon']} src="./weather/icons/umbrella.svg" alt='' />
                                                                <span>{Math.round(forecast.pop * 100)}%</span>
                                                            </div>

                                                            <div className={styles['weather-panes__item__detail--value']}>
                                                                <img
                                                                    className={styles['weather-panes__item--small-icon']}
                                                                    style={{ transform: `rotate(${forecast.wind_deg}deg)` }}
                                                                    src="./weather/icons/compass.svg"
                                                                    alt=''
                                                                />
                                                                <span>{Math.round(forecast.wind_speed)} <small>mph</small></span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className={styles["weather-app__forecast-selector"]}>
                                        <button
                                            className={`${styles["weather-app__forecast-selector--button"]} ${currentForecast === Forecast.daily ? styles["selected"] : ''}`}
                                            onClick={() => setCurrentForecast(Forecast.daily)}
                                        >
                                            daily
                                        </button>
                                        <div className={styles["weather-app__forecast-selector--divider"]}></div>
                                        <button
                                            className={`${styles["weather-app__forecast-selector--button"]} ${currentForecast === Forecast.hourly ? styles["selected"] : ''}`}
                                            onClick={() => setCurrentForecast(Forecast.hourly)}
                                        >
                                            hourly
                                        </button>
                                    </div>

                                    <button className={styles["close-button"]} onClick={toggleModal}>
                                        <img className={styles["weather-app__header--icon"]} src="./images/icons/navigation/cancel.svg" alt="Close" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </FullScreenModal>
        </>
    );
};

export default WeatherComponent;
