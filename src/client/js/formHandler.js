

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+ 1 + ' / '+ d.getDate()+' / '+ d.getFullYear();

// Create function that handles the submittion

document.getElementById('generate').addEventListener('click', handleSubmit);
function handleSubmit(event){
    event.preventDefault()
const city =  document.getElementById('city').value;
const startDay = document.getElementById('start').value;
const endDay = document.getElementById('end').value;
const length = Math.floor((new Date(endDay) - new Date(startDay))/(1000*60*60*24));
const countdown = Math.floor((new Date(startDay) - new Date(newDate))/(1000*60*60*24));

if (city && startDay && endDay) {
  const data = {
    city: city,
    startDay: startDay,
    endDay: endDay,
    length: length,
    countdown: countdown,
  };

  getWeather(data).then(async (res) => {
    try {
      const results = await res.json();
      if (results) {
        document.querySelector('#result-countdown').innerHTML = `...starts in ${countdown} days!`;
        document.querySelector('#result-city').innerHTML = `${city}`;
        document.querySelector('#result-start').innerHTML = `${startDay}`;
        document.querySelector('#result-end').innerHTML = `${endDay}`;
        document.querySelector('#result-length').innerHTML = `${length} days`;
        document.querySelector('#result-image').innerHTML = `<img class="result-image" src=${results.image}  alt="Random image of the city">`;}

if (results && countdown > 7) {
document.querySelector('#result-weather').innerHTML = `Forecast: max: ${results.highTemperature}°C / low: ${results.lowTemperature}°C`; }
if (results && countdown <= 7) {
  document.querySelector('#result-weather').innerHTML = `Temperature for today: ${results.nowTemperature}°C`;
}
        


    }

    // Create error alerts
    catch (error) {
                alert("error occoured, please try again");
              }
            }); 
          } else {
            alert("Enter the city and dates")}
  }

const getWeather = async (data) => {
    return await fetch(`http://localhost:8081/getWeather`, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

export { handleSubmit }