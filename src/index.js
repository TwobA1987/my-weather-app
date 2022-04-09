function showTemperature(response) {
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temp;
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let currentSky = response.data.weather[0].main;
  let currentSkyElement = document.querySelector(".current-sky");
  currentSkyElement.innerHTML = currentSky;
  let maxTemp = document.querySelector(".max-temp");
  let minTemp = document.querySelector(".min-temp");
  maxTemp.innerHTML = tempMax;
  minTemp.innerHTML = tempMin;
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
  updateDateTime();
  let searchBox = document.querySelector("#search-box");
  let city = searchBox.value;
  let apiKey = "a5e58eaf40fae13dec9122df08ce3fcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
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
  let currentTemp = document.querySelector("#current-temp");
  let farTemp = currentTemp.innerHTML;
  let celTemp = Math.round(((farTemp - 32) * 5) / 9);
  currentTemp.innerHTML = celTemp;
  let maxTemp = document.querySelector(".max-temp");
  let farMaxTemp = maxTemp.innerHTML;
  let celMaxTemp = Math.round(((farMaxTemp - 32) * 5) / 9);
  maxTemp.innerHTML = celMaxTemp;
  let minTemp = document.querySelector(".min-temp");
  let farMinTemp = minTemp.innerHTML;
  let celMinTemp = Math.round(((farMinTemp - 32) * 5) / 9);
  minTemp.innerHTML = celMinTemp;
}
function convertToFarenhite(event) {
  let currentTemp = document.querySelector("#current-temp");
  let celTemp = currentTemp.innerHTML;
  let farTemp = Math.round((celTemp * 9) / 5 + 32);
  currentTemp.innerHTML = farTemp;
  let maxTemp = document.querySelector(".max-temp");
  let celMaxTemp = maxTemp.innerHTML;
  let farMaxTemp = Math.round((celMaxTemp * 9) / 5 + 32);
  maxTemp.innerHTML = farMaxTemp;
  let minTemp = document.querySelector(".min-temp");
  let celMinTemp = minTemp.innerHTML;
  let farMinTemp = Math.round((celMinTemp * 9) / 5 + 32);
  minTemp.innerHTML = farMinTemp;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", findCity);
let currentCelTemp = document.querySelector(".celecius");
let currentFarTemp = document.querySelector(".farenhite");
currentCelTemp.addEventListener("click", convertToCelecius);
currentFarTemp.addEventListener("click", convertToFarenhite);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentPlace);
