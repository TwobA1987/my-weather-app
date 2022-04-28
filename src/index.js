function fetchCityData(city) {
  let apiKey = "a5e58eaf40fae13dec9122df08ce3fcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  updateDateTime();
  city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  celeciusTemp = response.data.main.temp;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celeciusTemp);
  celeciusMaxTemp = response.data.main.temp_max;
  celeciusMinTemp = response.data.main.temp_min;
  let currentSky = response.data.weather[0].main;
  let currentSkyElement = document.querySelector(".current-sky");
  currentSkyElement.innerHTML = currentSky;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  let maxTemp = document.querySelector(".max-temp");
  let minTemp = document.querySelector(".min-temp");
  maxTemp.innerHTML = Math.round(celeciusMaxTemp);
  minTemp.innerHTML = Math.round(celeciusMinTemp);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  FetchForecastData(response.data.coord);
}
function FetchForecastData(coords) {
  let apiKey = "a5e58eaf40fae13dec9122df08ce3fcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude={daily}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(ForecastDisplay);
}
function updateDateTime() {
  let now = new Date();
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentDateTime =
    weekDays[now.getDay()] + " " + currentHour + ":" + currentMinutes;
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = currentDateTime;
}
function findCity(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#search-box");
  city = searchBox.value;
  fetchCityData(city);
}
function searchCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a5e58eaf40fae13dec9122df08ce3fcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function showCurrentPlace(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCity);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayIndex = date.getDay();
  return weekDays[dayIndex];
}
function ForecastDisplay(response) {
  let forecastHTML = "";
  let forcastDays = response.data.daily;
  forcastDays.forEach(function (ForecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="forecast-day">${formatDay(ForecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                ForecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
            <div class="forecast-temp">
              <span class="forecast-temp-max">${Math.round(
                ForecastDay.temp.max
              )}°</span>
              <span class="forecast-temp-min">${Math.round(
                ForecastDay.temp.min
              )}°</span>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}
let city = "London";
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
updateDateTime();
fetchCityData(city);
let celeciusTemp = null;
let celeciusMaxTemp = null;
let celeciusMinTemp = null;
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", findCity);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentPlace);
