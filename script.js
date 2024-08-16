const apiKey = 'd21b0039b94f4502a8553018240408';

const searchBox = document.querySelector('.inputBox');
const searchBtn = document.querySelector('.searchBtn');
const conditionImage = document.querySelector('.conditionImage');
const temperature = document.querySelector('.temperature');
const condition = document.querySelector('.condition');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.windSpeed');
const cityName = document.querySelector('.cityName');
const error = document.querySelector('.error');

searchBtn.addEventListener('click', () => {
    let query = searchBox.value;
    if (!query) {
        displayError('Please enter a location');
    } else {
        fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                let weatherReport = data.current;
                cityName.textContent = data.location.name;
                conditionImage.src = `http:${weatherReport.condition.icon}`;
                temperature.innerHTML = `${weatherReport.temp_c}°C`;
                condition.innerHTML = weatherReport.condition.text;
                humidity.innerHTML = `Humidity: ${weatherReport.humidity}%`;
                windSpeed.innerHTML = `Wind Speed: ${weatherReport.wind_kph} km/h`;

                error.style.display = 'none';
            })
            .catch(err => {
                displayError('Location not matched');
            });
    }
});

function displayError(errorMessage) {
    cityName.textContent = 'City Name';
    conditionImage.src = 'images/404.png';
    temperature.innerHTML = '0°C';
    condition.innerHTML = '----';
    humidity.innerHTML = 'Humidity: 0%';
    windSpeed.innerHTML = 'Wind Speed: 0 km/h';

    error.style.display = 'block';
    error.textContent = errorMessage;
}
