
const API_KEY = '77fc8bbe218fbbea93f775d6b4fffc34';

const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = 'metric') => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();

  const { weather, main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name, timezone, coord: { lat, lon } } = data;

  const { description, icon } = weather[0];
  
  return {
    description, iconURL: makeIconURL(icon), temp, feels_like, temp_min, temp_max, pressure, humidity, speed, country, name, lat, lon, timezone
  };
};

export { getFormattedWeatherData };
