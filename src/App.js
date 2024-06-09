
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import moment from 'moment';
import './App.css';
import cloudy from "./assets/cloudyy.jpg";
import clear from "./assets/clear1.jpg";
import rainy from "./assets/rainy.png";
import cold from "./assets/cold.jpg";
import dusty from "./assets/dusty.jpg";

import Descriptions from './components/Descriptions';
import { getFormattedWeatherData } from './weather';

function App() {
  const [city, setCity] = useState('New Delhi');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [dateTime, setDateTime] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherdata = async () => {
      try {
        const data = await getFormattedWeatherData(city, units);
        setWeather(data);
        setError(null);

        if (data.description.toLowerCase().includes('clear sky')) {
          setBg(clear);
        } else if (data.description.toLowerCase().includes('cloud')) {
          setBg(cloudy);
        } else if (data.description.toLowerCase().includes('rain')) {
          setBg(rainy);
        } else if (data.description.toLowerCase().includes('snow') || data.description.toLowerCase().includes('cold')) {
          setBg(cold);
        } else {
          setBg(dusty);
        }

        const localDateTime = moment.utc().add(data.timezone, 'seconds').format('MMMM Do YYYY, h:mm:ss a');
        setDateTime(localDateTime);
      } catch (err) {
        setError("Could not fetch weather data. Please check the city name or your internet connection.");
        setWeather(null);
        setTimeout(() => {
          window.location.href = '/';
        }, 3500);
      }
    };
    fetchWeatherdata();
  }, [units, city]);

  useEffect(() => {
    if (dateTime) {
      const interval = setInterval(() => {
        setDateTime(prevDateTime => {
          const newTime = moment(prevDateTime, 'MMMM Do YYYY, h:mm:ss a').add(1, 'seconds').format('MMMM Do YYYY, h:mm:ss a');
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dateTime]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  const handleSearchClick = () => {
    setCity(document.querySelector("input[name='city']").value);
  };

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app ${theme}`} style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        <div className="theme-toggle">
          <label className="switch">
            <input type="checkbox" onChange={handleThemeToggle} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="date-time">
          {dateTime}
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage 
              error={error} 
              weather={weather} 
              units={units} 
              city={city} 
              bg={bg} 
              handleUnitsClick={handleUnitsClick} 
              enterKeyPressed={enterKeyPressed} 
              handleSearchClick={handleSearchClick} 
            />} />
            <Route path="/error" element={<ErrorPage error={error} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

const MainPage = ({ error, weather, units, city, bg, handleUnitsClick, enterKeyPressed, handleSearchClick }) => (
  <>
    {error && (
      <div className="error">
        {error}
      </div>
    )}
    {weather && (
      <div className="container">
        <div className="section section__inputs">
          <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City" />
          <button className="search-button" onClick={handleSearchClick}>Search</button>
          <button onClick={handleUnitsClick}>{units === 'metric' ? '°F' : '°C'}</button>
        </div>
        <div className="section section__temperature">
          <div className="icon">
            <h3>{`${weather.name}, ${weather.country}`}</h3>
            <img src={weather.iconURL} alt="weather-icon" />
            <h3>{weather.description}</h3>
          </div>
          <div className="temperature">
            <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`}</h1>
          </div>
        </div>
        <Descriptions weather={weather} units={units} />
      </div>
    )}
  </>
);

const ErrorPage = ({ error }) => (
  <div className="error">
    {error}
  </div>
);

export default App;
