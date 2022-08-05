//Feature #1: Header City Link Display//
//Los Angeles//
function getLa(event) {
  event.preventDefault();

  let apiKey = "2418968f77a7b86c4faf9f62831e5df3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=los angeles`;
  let units = "metric";

  axios
    .get(`${apiUrl}&units=${units}&appid=${apiKey}`)
    .then(displayCityWeather);
}

let losAngelesLink = document.querySelector("#los-angeles");
losAngelesLink.addEventListener("click", getLa);

// New York//
function getNy(event) {
  event.preventDefault();

  let apiKey = "2418968f77a7b86c4faf9f62831e5df3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=new york`;
  let units = "metric";

  axios
    .get(`${apiUrl}&units=${units}&appid=${apiKey}`)
    .then(displayCityWeather);
}

let newYorkLink = document.querySelector("#new-york");
newYorkLink.addEventListener("click", getNy);

//London//
function getLondon(event) {
  event.preventDefault();

  let apiKey = "2418968f77a7b86c4faf9f62831e5df3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london`;
  let units = "metric";

  axios
    .get(`${apiUrl}&units=${units}&appid=${apiKey}`)
    .then(displayCityWeather);
}

let londonLink = document.querySelector("#london");
londonLink.addEventListener("click", getLondon);

//Paris//
function getParis(event) {
  event.preventDefault();
  let apiKey = "2418968f77a7b86c4faf9f62831e5df3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=paris`;
  let units = "metric";

  axios
    .get(`${apiUrl}&units=${units}&appid=${apiKey}`)
    .then(displayCityWeather);
}

let parisLink = document.querySelector("#paris");
parisLink.addEventListener("click", getParis);

//Tokyo//
function getTokyo(event) {
  event.preventDefault();

  let apiKey = "2418968f77a7b86c4faf9f62831e5df3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=tokyo`;
  let units = "metric";

  axios
    .get(`${apiUrl}&units=${units}&appid=${apiKey}`)
    .then(displayCityWeather);
}

let tokyoLink = document.querySelector("#tokyo");
tokyoLink.addEventListener("click", getTokyo);

// Feature #2: Search Engine - Weather Display/ Forecast  //
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class= "row">`;
  let days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
       <div class="col-2">
           <div class="forecast-day">${day}</div>
           <div class="forecast-icon">
              <img src="images/weather-icons/animated/cloudy-day-1.svg" alt="sunny-icon" />
           </div>
           <div class="forecast-high-temp">
              30º<span class="degree-type">C</span>
          </div>
          <div class="forecast-low-temp">
              17º<span class="degree-type">C</span>
          </div>
        </div>           
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayCityWeather(response) {
  document.querySelector("#current-city-display").innerHTML =
    response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = Math.round(response.data.main.temp);
  currentHighTemp = Math.round(response.data.main.temp_max);
  currentLowTemp = Math.round(response.data.main.temp_min);

  document.querySelector("#main-degrees").innerHTML = celsiusTemp;

  document.querySelector(
    "#main-high-low"
  ).innerHTML = `<strong>${currentHighTemp}º</strong> | ${currentLowTemp}ºC`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like-temp").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function searchCity(city) {
  let apiKey = "2418968f77a7b86c4faf9f62831e5df3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
  let units = "metric";
  axios
    .get(`${apiUrl}&units=${units}&appid=${apiKey}`)
    .then(displayCityWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", handleSubmit);

// Feature #3: Geolocation API Weather Display from Current Location //

function getCurrentPosition(event) {
  event.preventDefault();
  function searchLocation(position) {
    let apiKey = "2418968f77a7b86c4faf9f62831e5df3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    let units = "metric";

    axios
      .get(`${apiUrl}&appid=${apiKey}&units=${units}`)
      .then(displayCityWeather);
  }
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#location-btn");
locationButton.addEventListener("click", getCurrentPosition);

// Feature #4: Date, Time, Updated Display//
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

  let currentDay = days[date.getDay()];

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

  let currentMonth = months[date.getMonth()];

  let currentDate = date.getDate();

  let currentYear = date.getFullYear();

  updateDay.innerHTML = ` ${currentDay}`;
  return `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
}

function formatTime(time) {
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hour >= 12) {
    amPm.innerHTML = `PM`;
    updateAmPm.innerHTML = `PM`;
  } else {
    amPm.innerHTML = `AM`;
    updateAmPm.innerHTML = `AM`;
  }
  updateTime.innerHTML = `${hour}:${minutes}`;
  return `${hour}:${minutes}`;
}

let currentDay = new Date();
let todaysDate = document.querySelector("#todays-date");
let todaysTime = document.querySelector("#todays-time");
let amPm = document.querySelector("#am-pm");
let updateDay = document.querySelector("#update-day");
let updateTime = document.querySelector("#update-time");
let updateAmPm = document.querySelector("#update-am-pm");

todaysDate.innerHTML = formatDate(currentDay);
todaysTime.innerHTML = formatTime(currentDay);

// Feature #5: Celsius & Fahrenheit Display//

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-degrees");
  let mainHighLowTemp = document.querySelector("#main-high-low");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  mainTemp.innerHTML = Math.round(fahrenheitTemp);
  mainHighLowTemp.innerHTML = `<strong>${Math.round(
    (currentHighTemp * 9) / 5 + 32
  )}º</strong> | ${Math.round((currentLowTemp * 9) / 5 + 32)}ºC`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-degrees");
  let mainHighLowTemp = document.querySelector("#main-high-low");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  mainTemp.innerHTML = celsiusTemp;
  mainHighLowTemp.innerHTML = `<strong>${currentHighTemp}º</strong> | ${currentLowTemp}ºC`;
}

let celsiusTemp = null;
let currentHighTemp = null;
let currentLowTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("Los Angeles");
displayForecast();
