const weatherCodeMap = {
  0: { description: "Clear sky", icon: "☀️" },
  1: { description: "Mainly clear", icon: "🌤️" },
  2: { description: "Partly cloudy", icon: "⛅" },
  3: { description: "Overcast", icon: "☁️" },
  45: { description: "Fog", icon: "🌫️" },
  48: { description: "Depositing rime fog", icon: "🌫️" },
  51: { description: "Light drizzle", icon: "🌦️" },
  53: { description: "Moderate drizzle", icon: "🌦️" },
  55: { description: "Dense drizzle", icon: "🌧️" },
  56: { description: "Light freezing drizzle", icon: "🌨️" },
  57: { description: "Dense freezing drizzle", icon: "🌨️" },
  61: { description: "Slight rain", icon: "🌦️" },
  63: { description: "Moderate rain", icon: "🌧️" },
  65: { description: "Heavy rain", icon: "⛈️" },
  66: { description: "Light freezing rain", icon: "🌨️" },
  67: { description: "Heavy freezing rain", icon: "🌨️" },
  71: { description: "Slight snow fall", icon: "❄️" },
  73: { description: "Moderate snow fall", icon: "🌨️" },
  75: { description: "Heavy snow fall", icon: "❄️" },
  77: { description: "Snow grains", icon: "🌨️" },
  80: { description: "Slight rain showers", icon: "🌦️" },
  81: { description: "Moderate rain showers", icon: "🌧️" },
  82: { description: "Violent rain showers", icon: "⛈️" },
  85: { description: "Slight snow showers", icon: "🌨️" },
  86: { description: "Heavy snow showers", icon: "❄️" },
  95: { description: "Thunderstorm", icon: "⛈️" },
  96: { description: "Thunderstorm with slight hail", icon: "⛈️" },
  99: { description: "Thunderstorm with heavy hail", icon: "⛈️" }
};

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const errorBanner = document.getElementById("error-banner");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const time = document.getElementById("time");
const recentSearchesContainer = document.getElementById("recent-searches");
const celsiusBtn = document.getElementById("celsius-btn");
const fahrenheitBtn = document.getElementById("fahrenheit-btn");

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

function removeSkeleton(element) {
  element.classList.remove("skeleton");
  element.classList.remove("skeleton-title");
  element.classList.remove("skeleton-temp");
  element.classList.remove("skeleton-line");
  element.classList.remove("skeleton-day");
  element.classList.remove("skeleton-icon");
  element.classList.remove("skeleton-small");
}

function updateCurrentWeather(location, weatherData) {
  const current = weatherData.current_weather;
  const currentIndex = weatherData.hourly.time.indexOf(current.time);
  const weatherInfo = weatherCodeMap[current.weathercode] || {
    description: "Unknown",
    icon: "❓"
  };

  cityName.textContent = location.name;
  temperature.textContent = formatTemperature(current.temperature);
  description.textContent = `${weatherInfo.icon} ${weatherInfo.description}`;
  humidity.textContent = `Humidity: ${weatherData.hourly.relativehumidity_2m[currentIndex]}%`;
  windSpeed.textContent = `Wind Speed: ${current.windspeed} km/h`;

  removeSkeleton(cityName);
  removeSkeleton(temperature);
  removeSkeleton(description);
  removeSkeleton(humidity);
  removeSkeleton(windSpeed);
}

function updateForecast(weatherData) {
  const daily = weatherData.daily;

  for (let i = 0; i < 7; i++) {
    const weatherInfo = weatherCodeMap[daily.weathercode[i]] || {
      description: "Unknown",
      icon: "❓"
    };

    const date = new Date(daily.time[i]);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

    forecastElements[i].dayName.textContent = dayName;
    forecastElements[i].dayIcon.textContent = weatherInfo.icon;
    forecastElements[i].dayTemp.textContent = `${formatTemperature(daily.temperature_2m_max[i])} / ${formatTemperature(daily.temperature_2m_min[i])}`;

    removeSkeleton(forecastElements[i].dayName);
    removeSkeleton(forecastElements[i].dayIcon);
    removeSkeleton(forecastElements[i].dayTemp);
  }
}

function showErrorBanner(message) {
  errorBanner.innerHTML = `
    <div class="error-box">
      <span>${message}</span>
      <button id="retry-btn" type="button">Retry</button>
    </div>
  `;

  const retryBtn = document.getElementById("retry-btn");
  retryBtn.addEventListener("click", function () {
    searchBtn.click();
  });
}

function formatLocalTime(dateTimeString) {
  const date = new Date(dateTimeString);

  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

function fetchLocalTime(timezone) {
  if (!timezone) {
    time.textContent = `Time: ${formatLocalTime(new Date())}`;
    removeSkeleton(time);
    return;
  }

  $.getJSON(`https://worldtimeapi.org/api/timezone/${timezone}`)
    .done(function (timeData) {
      time.textContent = `Time: ${formatLocalTime(timeData.datetime)}`;
      removeSkeleton(time);
    })
    .fail(function () {
      time.textContent = `Time: ${formatLocalTime(new Date())}`;
      removeSkeleton(time);
    })
    .always(function () {
      console.log("Local time request completed at:", new Date().toLocaleString());
    });
}

function formatTemperature(celsiusValue) {
  if (currentUnit === "F") {
    const fahrenheitValue = (celsiusValue * 9) / 5 + 32;
    return `${fahrenheitValue.toFixed(1)}°F`;
  }

  return `${celsiusValue}°C`;
}

function saveRecentSearch(city) {
  recentSearches = recentSearches.filter(function (item) {
    return item.toLowerCase() !== city.toLowerCase();
  });

  recentSearches.unshift(city);
  recentSearches = recentSearches.slice(0, 5);

  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  renderRecentSearches();
}

function renderRecentSearches() {
  recentSearchesContainer.innerHTML = "";

  recentSearches.forEach(function (city) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "search-chip";
    chip.textContent = city;

    chip.addEventListener("click", function () {
      cityInput.value = city;
      searchWeather();
    });

    recentSearchesContainer.appendChild(chip);
  });
}

async function searchWeather() {
  const city = cityInput.value.trim();

  if (city === "" || city.length < 2) {
    errorBanner.textContent = "Please enter at least 2 characters for the city name.";
    return;
  }

  errorBanner.textContent = "";

  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

    const geoController = new AbortController();
    const geoTimeoutId = setTimeout(function () {
      geoController.abort();
    }, 10000);

    const geoResponse = await fetch(geoUrl, {
      signal: geoController.signal
    });

    clearTimeout(geoTimeoutId);

    if (!geoResponse.ok) {
      throw new Error(`Geocoding request failed with status ${geoResponse.status}`);
    } 

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      errorBanner.textContent = "City not found. Please try another city.";
      return;
    }

    const location = geoData.results[0];
    saveRecentSearch(location.name);
    const latitude = location.latitude;
    const longitude = location.longitude;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

    const weatherController = new AbortController();
    const weatherTimeoutId = setTimeout(function () {
      weatherController.abort();
    }, 10000);

    const weatherResponse = await fetch(weatherUrl, {
      signal: weatherController.signal
    });

    clearTimeout(weatherTimeoutId);

    if (!weatherResponse.ok) {
      throw new Error(`Weather request failed with status ${weatherResponse.status}`);
    } 

    const weatherData = await weatherResponse.json();
    lastWeatherData = weatherData;
    lastLocation = location;

    updateCurrentWeather(location, weatherData);
    updateForecast(weatherData);
    fetchLocalTime(weatherData.timezone);
    } catch (error) {
    if (error.name === "AbortError") {
      showErrorBanner("Request timed out after 10 seconds. Please try again.");
      return;
    }

  showErrorBanner(error.message);
 }
}
let debounceTimer;
let debounceTimer;
let currentUnit = "C";
let lastWeatherData = null;
let lastLocation = null;

let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

searchBtn.addEventListener("click", function () {
  searchWeather();
});

cityInput.addEventListener("input", function () {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(function () {
    if (cityInput.value.trim().length >= 2) {
      searchWeather();
    }
  }, 500);
});

celsiusBtn.addEventListener("click", function () {
  currentUnit = "C";
  celsiusBtn.classList.add("active");
  fahrenheitBtn.classList.remove("active");

  if (lastWeatherData && lastLocation) {
    updateCurrentWeather(lastLocation, lastWeatherData);
    updateForecast(lastWeatherData);
  }
});

fahrenheitBtn.addEventListener("click", function () {
  currentUnit = "F";
  fahrenheitBtn.classList.add("active");
  celsiusBtn.classList.remove("active");

  if (lastWeatherData && lastLocation) {
    updateCurrentWeather(lastLocation, lastWeatherData);
    updateForecast(lastWeatherData);
  }
});

renderRecentSearches();