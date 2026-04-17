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