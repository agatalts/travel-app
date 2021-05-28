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

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
});

// POST route that adds incoming data to projectData

app.post("/getWeather", projectData = (req, res) => {
const {city} = req.body;
const {countdown} = req.body;
const geonames_url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=agatalts`;
fetch(geonames_url)
.then((res) => res.json())
.then((json) => {
  const latitude = json.geonames[0].lat;
  const longitude = json.geonames[0].lng;
  const weatherbit_url = `https://api.weatherbit.io/v2.0/current/daily?lat=${latitude}&lon=${longitude}&key=d9af636353964ce2bc494531d1cff5cc`;
  fetch(weatherbit_url)
  .then((res) => res.json())
  .then((json) => {
    const nowTemperature = json.data[0].temp;
  
   
    const weatherbit_url2 = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=d9af636353964ce2bc494531d1cff5cc`;
    fetch(weatherbit_url2)
  .then((res) => res.json())
  .then((json) => {
    const highTemperature = json.data[countdown].high_temp;
    const lowTemperature = json.data[countdown].low_temp;

    const pixabay_url = `https://pixabay.com/api/?key=21089515-7c3f2dbad544e7a985e0e3257&q=${city}&image_type=photo`;
    fetch(pixabay_url)
    .then((res) => res.json())
    .then((json) => {
     const image = json.hits[0].webformatURL;
     const results = {
     city: city,
     nowTemperature: nowTemperature,
     highTemperature: highTemperature,
     lowTemperature: lowTemperature,
     image: image,
      };
      res.send(results);
});
});
});
});})
