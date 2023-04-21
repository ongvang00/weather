// API URL with your API key
const apiKey = "083313940c434e03e5fc6c10373cc537";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=imperial";

// Selecting HTML elements to update
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const conditions = document.querySelector(".conditions");
const hTemp = document.querySelector(".hTemp");
const lTemp = document.querySelector(".lTemp");
const zipCodeInput = document.querySelector("input");

// Function to fetch weather data and update HTML elements
async function getWeatherData(zipCode) {
  try {
// Fetching data from API based on zip code
    const response = await fetch(apiUrl + "&zip=" + zipCode);
    const data = await response.json();

// Updating HTML elements with weather data
    city.textContent = data.name;
    temp.textContent = data.main.temp + " °F";
    conditions.textContent = data.weather[0].description;
    hTemp.textContent = "H: " + data.main.temp_max + "°F";
    lTemp.textContent = "L: " + data.main.temp_min + "°F";

  } catch (error) {
    console.log(error);
  }
}

// Adding event listener to search button
const searchBtn = document.querySelector("button");
searchBtn.addEventListener("click", function() {
  const zipCode = zipCodeInput.value;
  getWeatherData(zipCode);
});