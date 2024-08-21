const apiKey = '9fdce74934b94d1635d2f217b33cbe5f';  // Replace with your actual API key from a service like OpenWeatherMap

function fetchWeather() {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        fetch(apiURL)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching the weather data:', error));
    });
}

function displayWeather(data) {
    const locationElement = document.querySelector('.location');
    const temperatureElement = document.querySelector('.temperature');
    const descriptionElement = document.querySelector('.description');
    const iconElement = document.querySelector('.icon');

    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;

    const icon = document.createElement('img');
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;
    iconElement.innerHTML = '';
    iconElement.appendChild(icon);
}

document.addEventListener('DOMContentLoaded', fetchWeather);
