import { getByCity } from './api.js';
import {cities} from './cityData.js';
//import { selectedCity } from './index.js';

function renderCity(data) {
    const weather = [];
    const container = document.querySelector('.cities-list');
    const cityContainer = document.createElement('div');
    const iconTemp = document.createElement('span');
    iconTemp.classList.add('temp');
    const infoWeather = document.createElement('span');
    infoWeather.classList.add('second-info');

    cityContainer.classList.add('cities-list__info');
    cityContainer.innerText = `${data.name}: `;
    iconTemp.innerHTML = `<img src="images/${data.weather[0].icon}.png" alt="icon"/>  ${Math.floor(data.main.temp)}°C`;
    cityContainer.append(iconTemp);
    cityContainer.append(infoWeather);
    infoWeather.innerText = `Pressure: ${data.main.pressure}mb, Humidity: ${data.main.humidity}%, ${data.weather[0].main}`;
    container.append(cityContainer);
}

let arrayOfPromises = [];

for(let city in cities) {
    arrayOfPromises.push(getByCity(cities[city].name))
}

Promise.all(arrayOfPromises).then(data => data.map(item => renderCity(item)))