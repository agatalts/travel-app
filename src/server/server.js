// Setup empty JS object to act as endpoint for all routes

projectData = {};



// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

const bodyParser = require('body-parser');

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
  console.log(projectData);
});

// POST route that adds incoming data to projectData

app.post('/add', (req, res) => {
projectData = req.body;
console.log(projectData);
});

