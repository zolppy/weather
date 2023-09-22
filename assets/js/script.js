const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const clearInput = (e) => {
  e.target.value = '';
  cityInput.focus();
}

const getWeatherData = async(city) => {
  const apikey = '3294e3c61137a38c75ca2e822e816471'; /* Gere a sua própria chave */
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

  const data = await fetch(apiWeatherURL).then(res => res.json());

  if (data.cod === '404') {
    return null;
  }
  
  return data;
}

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);
  const weatherContainer = document.querySelector('#weather-data');

  if (data) {
    const cityElement = document.querySelector('#city');
    const tempElement = document.querySelector('#temperature span');
    const descriptionElement = document.querySelector('#description');
    const weatherIconElement = document.querySelector('#weather-icon');
    const countryElement = document.querySelector('#country');
    const humidityElement = document.querySelector('#humidity span');
    const windElement = document.querySelector('#wind span');

    cityElement.textContent = data.name;
    tempElement.textContent = parseInt(data.main.temp);
    descriptionElement.textContent = data.weather[0].description;
    weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed} km/h`;

    weatherContainer.classList.remove('hide');
  } else {
    alert('Cidade inválida!');
  }
}

searchBtn.addEventListener('click', (e) => {
  const city = cityInput.value;

  clearInput(e);
  showWeatherData(city);
});

cityInput.addEventListener('keyup', (e) => {
  if (e.code === 'Enter') {
    const city = e.target.value;

    clearInput(e);
    showWeatherData(city);
  }
});