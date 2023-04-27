// Define a type for the data fetched from the API
type WeatherData = {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
  }[];
};

const apiKey: string = "083313940c434e03e5fc6c10373cc537";
const apiUrl: string = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=imperial";

// Selecting HTML elements to update
const city: HTMLElement | null = document.querySelector(".city");
const temp: HTMLElement | null = document.querySelector(".temp");
const conditions: HTMLElement | null = document.querySelector(".conditions");
const hTemp: HTMLElement | null = document.querySelector(".hTemp");
const lTemp: HTMLElement | null = document.querySelector(".lTemp");
const zipCodeInput: HTMLInputElement | null = document.querySelector("input");

// Function to fetch weather data and update HTML elements
async function getWeatherData(zipCode: string): Promise<void> {
  try {
    // Fetching data from API based on zip code
    const response: Response = await fetch(`${apiUrl}&zip=${zipCode}`);
    const data: WeatherData = await response.json();

    // Updating HTML elements with weather data
    if (city && temp && conditions && hTemp && lTemp) {
      city.textContent = data.name;
      temp.textContent = `${data.main.temp} °F`;
      conditions.textContent = data.weather[0].description;
      hTemp.textContent = `H: ${data.main.temp_max}°F`;
      lTemp.textContent = `L: ${data.main.temp_min}°F`;
    }
  } catch (error) {
    console.log(error);
  }
}

// Adding event listener to search button
const searchBtn: HTMLElement | null = document.querySelector("button");
if (searchBtn && zipCodeInput) {
  searchBtn.addEventListener("click", function() {
    const zipCode: string = zipCodeInput.value;
    getWeatherData(zipCode);
  });
}
