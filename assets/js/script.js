/* Variáveis e mapeamento */
const apikey = '3294e3c61137a38c75ca2e822e816471';
const apiCountryURL = 'https://flagsapi.com/BE/shiny/64.png';

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descriptionElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');
const weatherContainer = document.querySelector('#weather-data');

/* Funções */
const getWeatherData = async(city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
}

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.textContent = data.name;
  tempElement.textContent = parseInt(data.main.temp);
  descriptionElement.textContent = data.weather[0].description;
  weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
  humidityElement.textContent = `${data.main.humidity}%`;
  windElement.textContent = `${data.wind.speed} km/h`;

  weatherContainer.classList.remove('hide');
}

/* Eventos */
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener('keyup', (e) => {
  if (e.code === 'Enter') {
    const city = e.target.value;

    showWeatherData(city);
  }
});

/* Pode ser adicionado armazenamento local para guardar a última cidade pesquisada ou funções para capturar a localização do usuário */