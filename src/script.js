// CURRENT DATE

let today = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dayWeek = days[date.getDay()];
  let month = months[date.getMonth()];
  let dayNumber = date.getUTCDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  let min = date.getMinutes();

  if (min < 10) {
    min = `0${min}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${dayWeek} ${dayNumber}, ${month} ${year}, ${hours}:${min}`;
}
let currentDate = document.querySelector("#display-current-date");
currentDate.innerHTML = formatDate(today);

// CURRENT DATE

// FORECAST

function formatDay (timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return days[day];
}

function displayForecast(response){
let forecastElement = document.querySelector("#forecast");

let forecast = (response.data.daily);
let forecastHTML = `<div class="row p-5">`;
let maxTemperature = 

forecast.forEach(function(forecastDay, index){
if (index < 6)
  forecastHTML = forecastHTML + `
  <div class="col-2">
    <div class="days-box shadow-sm">
    <h5>${formatDay(forecastDay.time)}</h5>
    <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
      class="icon-forecast"
      alt="sun icon"
      
    />
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}˚</span>
      <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}˚</span>
      </div>  
    </div>
  </div>
`;

});

forecastHTML = forecastHTML +`</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(cityForecast){
  console.log(cityForecast);

  let apikey = `54dfafe0odf6d0ff9b243ctbada790a3`;
  let units = `metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityForecast}&key=${apikey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

//
// SEARCH CITY INPUT

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.city;

  let description = response.data.condition.description;
  document.querySelector("#condition-description").innerHTML = `${description}`;

  let temperature = Math.round(response.data.temperature.current);
  document.querySelector("#temperature").innerHTML = `${temperature}`;

  celciusTemperature = temperature;

  let humidity = response.data.temperature.humidity;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `${wind}km/h`;

  let apiIcon = response.data.condition.icon_url;
  document.querySelector("#main-icon").setAttribute("src", `${apiIcon}`);

  document.querySelector("#main-icon").setAttribute("alt", `${description}`);

  getForecast(response.data.city);

  // if i designed my own icons, i can use this code to change the icons accord to the API condition/icon
  //let iconApiRefence = response.data.condition.icon;
  //document.querySelector("#main-icon").setAttribute("src", `images/${iconApiRefence}.png`);
}

function search(city) {
  let apikey = `54dfafe0odf6d0ff9b243ctbada790a3`;
  let units = `metric`;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=${units}`;
  axios.get(url).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input");
  search(city.value);
}

let searchCityType = document.querySelector("#search-city-form");
searchCityType.addEventListener("submit", handleSubmit);

// SEARCH CITY INPUT

// currently LOCATION BUTTON

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apikey = `54dfafe0odf6d0ff9b243ctbada790a3`;
  let units = `metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apikey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);

// currently LOCATION BUTTON



search("Berlin");

