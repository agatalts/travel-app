const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes

projectData = {};



// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

const bodyParser = require('body-parser');

const fetch = require('node-fetch')

app.use(express.static('dist'));

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
const { response } = require('express');
app.use(cors());



// Setup Server

app.listen(8081, function () {
 console.log('App listening on port 8081!')
})

// GET route that returns the projectData object

app.get('/return', (req, res) => {
  res.send(projectData);
});



// POST route that adds incoming data to projectData

app.post("/getWeather", projectData = (req, res) => {
const {city} = req.body;
const {countdown} = req.body;

// get latitude and longitude from GeoNames

const geonames_url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=agatalts`;
fetch(geonames_url)
.then((res) => res.json())
.then((json) => {
  const latitude = json.geonames[0].lat;
  const longitude = json.geonames[0].lng;

// get the current weather from Weatherbit
  const weatherbit_url = `https://api.weatherbit.io/v2.0/current/daily?lat=${latitude}&lon=${longitude}&key=d9af636353964ce2bc494531d1cff5cc`;
  fetch(weatherbit_url)
  .then((res) => res.json())
  .then((json) => {
    const nowTemperature = json.data[0].temp;

    // get the weather forecast from the Weatherbit

    const weatherbit_url2 = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=d9af636353964ce2bc494531d1cff5cc`;
    fetch(weatherbit_url2)
  .then((res) => res.json())
  .then((json) => {
    const highTemperature = json.data[countdown-1].high_temp;
    const lowTemperature = json.data[countdown-1].low_temp;

    // get the random photo of the city from Pixabay
    
    const pixabay_url = `https://pixabay.com/api/?key=21089515-7c3f2dbad544e7a985e0e3257&q=${city}&image_type=photo`;
    fetch(pixabay_url)
    .then((res) => res.json())
    .then((json) => {
     const image = json.hits[0].webformatURL;
     const results = {
     city: city,
     nowTemperature: Math.floor(nowTemperature),
     highTemperature: Math.floor(highTemperature),
     lowTemperature: Math.floor(lowTemperature),
     image: image,
      };
      res.send(results);
});
});
});
});})
