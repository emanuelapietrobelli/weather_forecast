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
function displayForecast(response){
console.log(response.data.daily);

let forecastElement = document.querySelector("#forecast");

let days = ["Mon","Tur","Wed", "Thu", "Fri"];
let forecastHTML = `<div class="row gx-4">`;

days.forEach(function(day){

  forecastHTML = forecastHTML + `
  <div class="col-2 next-days">
    <div class="days-box shadow-sm bg-body-tertiary">
    <h5>${day}</h5>
    <img
      src="images/sun_icon.svg"
      class="icon-forecast img-fluid"
      alt="sun icon"
    />
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max"> 27˚</span>
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

// TEMPERATURE

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  celciusLink.classList.remove("active");
  celciusLink.classList.add("non-active");

  fahrenheitLink.classList.add("active");

  let temperature = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  fahrenheitLink.classList.add("non-active");

  celciusLink.classList.add("active");

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = celciusTemperature;
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

search("Berlin");

