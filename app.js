const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const errorBanner = document.getElementById("error-banner");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const time = document.getElementById("time");

const forecastElements = [
  {
    dayName: document.getElementById("day-1-name"),
    dayIcon: document.getElementById("day-1-icon"),
    dayTemp: document.getElementById("day-1-temp")
  },
  {
    dayName: document.getElementById("day-2-name"),
    dayIcon: document.getElementById("day-2-icon"),
    dayTemp: document.getElementById("day-2-temp")
  },
  {
    dayName: document.getElementById("day-3-name"),
    dayIcon: document.getElementById("day-3-icon"),
    dayTemp: document.getElementById("day-3-temp")
  },
  {
    dayName: document.getElementById("day-4-name"),
    dayIcon: document.getElementById("day-4-icon"),
    dayTemp: document.getElementById("day-4-temp")
  },
  {
    dayName: document.getElementById("day-5-name"),
    dayIcon: document.getElementById("day-5-icon"),
    dayTemp: document.getElementById("day-5-temp")
  },
  {
    dayName: document.getElementById("day-6-name"),
    dayIcon: document.getElementById("day-6-icon"),
    dayTemp: document.getElementById("day-6-temp")
  },
  {
    dayName: document.getElementById("day-7-name"),
    dayIcon: document.getElementById("day-7-icon"),
    dayTemp: document.getElementById("day-7-temp")
  }
];


searchBtn.addEventListener("click", function () {
  const city = cityInput.value.trim();

  if (city === "") {
    errorBanner.textContent = "Please enter a city name.";
    return;
  }

  errorBanner.textContent = "";
  console.log(city);
});

searchBtn.addEventListener("click", async function () {
  const city = cityInput.value.trim();

  if (city === "") {
    errorBanner.textContent = "Please enter a city name.";
    return;
  }

  errorBanner.textContent = "";

  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

  const response = await fetch(geoUrl);
  const data = await response.json();

  console.log(data);
});

searchBtn.addEventListener("click", async function () {
  const city = cityInput.value.trim();

  if (city === "") {
    errorBanner.textContent = "Please enter a city name.";
    return;
  }

  errorBanner.textContent = "";

  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

  const response = await fetch(geoUrl);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    errorBanner.textContent = "City not found. Please try another city.";
    return;
  }

  const location = data.results[0];
  console.log(location);
});