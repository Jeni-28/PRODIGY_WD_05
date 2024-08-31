const apiKey = "9bc5de60a3e61b18f5da1eb7a81d0c6f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");

async function checkWeather(city) {
    const startTime = performance.now();
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const endTime = performance.now();
    console.log(`API response time: ${endTime - startTime} ms`);

    const data = await response.json();

    if (data.cod === "404") {
        alert("City not found!");
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
 switch (data.weather[0].main) {
    case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
    case "Clear":
         weatherIcon.src = "images/clear.png";
         break;
    case "Rain":
        weatherIcon.src = "images/rain.png";
         break;
    case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
         break;
    case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
    default:
        weatherIcon.src = "images/default.png"; // Fallback icon
    }

    document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
