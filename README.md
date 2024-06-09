# Weather App

A simple weather application that fetches and displays weather data for a specified city using the OpenWeatherMap API. The app includes features like theme toggling, background images based on weather conditions, and unit conversion between Celsius and Fahrenheit.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Known Issues and Limitations](#known-issues-and-limitations)

## Technologies Used

- React
- React Router
- Fetch API
- OpenWeatherMap API

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
2. Install dependencies:

Make sure you have Node.js and npm installed. Then, run:

   npm install

   
3 .Set up Api:

 add your OpenWeatherMap API key:


REACT_APP_WEATHER_API_KEY=your_api_key_here



4. Run the application:


   npm start



# Running the Application


To run the application locally, follow the setup instructions above. Once the application is running, you can:

Search for a city: Enter the name of a city in the search bar and press Enter or click the Search button to fetch and display the weather data.

Toggle units: Click the button to toggle between Celsius and Fahrenheit.

Toggle theme: Use the theme toggle switch to switch between light and dark themes.

Background images: The background image changes based on the current weather conditions.




# Known Issues and Limitations





Error Handling: When an error occurs (e.g., invalid city name or network issue), an error message is displayed. Ensure the initial fetch logic is robust enough to handle these scenarios smoothly.

Responsive Design: Ensure the application is fully responsive and looks good on all screen sizes.



# Approach and Technologies Used




React: The application is built using React for building the user interface and managing state.

React Router: Used for routing between the main page and the error page.


Fetch API: For making HTTP requests to the OpenWeatherMap API to fetch weather data.


OpenWeatherMap API: Provides the weather data based on the city name and unit preferences.
