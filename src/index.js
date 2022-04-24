function fetchCityData(city) {
  let apiKey = "a5e58eaf40fae13dec9122df08ce3fcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
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
  let maxTemp = document.querySelector(".max-temp");
  let minTemp = document.querySelector(".min-temp");
  maxTemp.innerHTML = Math.round(celeciusMaxTemp);
  minTemp.innerHTML = Math.round(celeciusMinTemp);
}
function updateDateTime() {
  let now = new Date();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
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
function convertToCelecius(event) {
  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = Math.round(celeciusTemp);
  let maxTempElement = document.querySelector(".max-temp");
  maxTempElement.innerHTML = Math.round(celeciusMaxTemp);
  let minTempElement = document.querySelector(".min-temp");
  minTempElement.innerHTML = Math.round(celeciusMinTemp);
}
function convertToFarenhite(event) {
  let currentTempElement = document.querySelector("#current-temp");
  let farTemp = Math.round((celeciusTemp * 9) / 5 + 32);
  currentTempElement.innerHTML = farTemp;
  let maxTempElement = document.querySelector(".max-temp");
  let farMaxTemp = Math.round((celeciusMaxTemp * 9) / 5 + 32);
  maxTempElement.innerHTML = farMaxTemp;
  let minTempElement = document.querySelector(".min-temp");
  let farMinTemp = Math.round((celeciusMinTemp * 9) / 5 + 32);
  minTempElement.innerHTML = farMinTemp;
}
updateDateTime();
let city = "tehran";
fetchCityData(city);
let celeciusTemp = null;
let celeciusMaxTemp = null;
let celeciusMinTemp = null;
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", findCity);
let currentCelTemp = document.querySelector(".celecius");
let currentFarTemp = document.querySelector(".farenhite");
currentCelTemp.addEventListener("click", convertToCelecius);
currentFarTemp.addEventListener("click", convertToFarenhite);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentPlace);
