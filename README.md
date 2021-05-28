# Travel App

## Overview

This is an asynchronous web app that uses web API and user data to dynamically update the UI.
According to the destination and travel dates provided by the user the application displays the days when the trip starts, the length of the trip and the weather for the searched city.
If the trip starts within 7 days, the current temperature is displayed. If the trip starts after 7 days, the weather forecast for the selected starting date is displayed. The user can choose a date up to 16 days.

## How the app works

According to the city provided, the app gets its langitude and longitude from Geonames API. Thanks to that the weather and the weather forecast can be obtained from WeatherBit API.
The app displays a random photo of the city provided by Pixabay API.

## Start the app

```
npm run build-prod
```

Run this command in the project directory to build the app

```
npm start
```

Run this command to start the server

## The Project

This app is the last project in Udacity's Nanodegree Program
