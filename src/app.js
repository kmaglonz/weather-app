// Feature #1: Date & Time Display//
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

// Feature #2: Search Engine - City Name Display  //

function displayCityWeather(response) {
  document.querySelector("#current-city-display").innerHTML =
    response.data.name;
  document.querySelector("#main-degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#main-high-low").innerHTML = `<strong>${Math.round(
    response.data.main.temp_max
  )}º</strong> | ${Math.round(response.data.main.temp_min)}ºC`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like-temp").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
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

searchCity("Los Angeles");

// Bonus Feature: Celsius & Fahrenheit Display//
function showCelsiusTemp(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let celsiusDisplay = document.querySelector("#main-degrees");
  let highLowTemp = document.querySelector("#main-high-low");
  let apiKey = "2418968f77a7b86c4faf9f62831e5df3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}`;
  let units = "metric";
  celsiusLink.classList.remove("inactive");
  fahrenheitLink.classList.add("inactive");

  function getCelsius(response) {
    let celsiusTemp = Math.round(response.data.main.temp);
    let currentHigh = Math.round(response.data.main.temp_max);
    let currentLow = Math.round(response.data.main.temp_min);
    celsiusDisplay.innerHTML = Math.round(celsiusTemp);
    highLowTemp.innerHTML = `<strong>${currentHigh}º</strong> | ${currentLow}ºC`;
  }

  axios.get(`${apiUrl}&units=${units}&appid=${apiKey}`).then(getCelsius);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let celsiusDisplay = document.querySelector("#main-degrees");
  let highLowTemp = document.querySelector("#main-high-low");

  let apiKey = "2418968f77a7b86c4faf9f62831e5df3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}`;
  let units = "metric";
  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.remove("inactive");

  function getFahrenheit(response) {
    let celsiusTemp = Math.round(response.data.main.temp);
    let celsiusHigh = Math.round(response.data.main.temp_max);
    let celsiusLow = Math.round(response.data.main.temp_min);
    let fahrenheitTemp = Math.round(celsiusTemp * 1.8 + 32);
    let fahrenheitHigh = Math.round(celsiusHigh * 1.8 + 32);
    let fahrenheitLow = Math.round(celsiusLow * 1.8 + 32);
    celsiusDisplay.innerHTML = fahrenheitTemp;
    highLowTemp.innerHTML = `<strong>${fahrenheitHigh}º</strong> | ${fahrenheitLow}ºF`;
  }

  axios.get(`${apiUrl}&units=${units}&appid=${apiKey}`).then(getFahrenheit);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

// Bonus: Geolocation API Weather Display //

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

//Featured City Link Display//
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
