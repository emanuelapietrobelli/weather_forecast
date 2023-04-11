// CURRENT DATE


let today = new Date()

function formatDate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
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
      "December"
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

    return `${dayWeek} ${dayNumber}, ${month} ${year}, ${hours}:${min}`

}
let currentDate = document.querySelector("#display-current-date");
currentDate.innerHTML = formatDate(today);

// CURRENT DATE


// SEARCH CITY INPUT

function displayWeatherCondition(response) {

  document.querySelector("#city-name").innerHTML = response.data.city

  let temperature = Math.round(response.data.temperature.current);
  document.querySelector("#temperature").innerHTML = `${temperature}`

  let humidity = response.data.temperature.humidity;
  document.querySelector("#humidity").innerHTML = `${humidity}%`
  
  let wind = Math.round(response.data.wind.speed) 
  document.querySelector("#wind").innerHTML = `${wind}km/h`
}


function search(city){
  let apikey = `54dfafe0odf6d0ff9b243ctbada790a3`;
  let units = `metric`;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=${units}`
  axios.get(url).then(displayWeatherCondition);

}

function handleSubmit(event){
  event.preventDefault();  
  let city = document.querySelector("#search-city-input").value 
 search(city);
}

let searchCityType = document.querySelector("#search-city-form");
searchCityType.addEventListener("submit",handleSubmit);


search ("Berlin")


// SEARCH CITY INPUT


// currently LOCATION BUTTON

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apikey = `54dfafe0odf6d0ff9b243ctbada790a3`;
  let units = `metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apikey}&units=${units}`  ;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentPosition(){
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#current-location-button")
button.addEventListener("click", getCurrentPosition);

// currently LOCATION BUTTON






// TEMPERATURE


//function changeCelcius(event){
//  event.preventDefault();
//let celciusTemperature = document.querySelector("#temperature");
//celciusTemperature.innerHTML = `19`/
//}
//let toCelcius = document.querySelector("#celcius-link");
//toCelcius.addEventListener("click", changeCelcius);

// TEMPERATURE
