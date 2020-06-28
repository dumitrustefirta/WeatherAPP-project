import { getByCity } from './api.js';
import {cities} from './cityData.js';

function renderCity(data) {
    const container = document.querySelector('.cities-list');
    const cityContainer = document.createElement('div');
    const cityTemp = document.createElement('span');

    cityContainer.classList.add('cities-list__info');
    cityContainer.innerText = `${data.name}, ${data.sys.country}`;
    cityContainer.append(cityTemp);
    cityTemp.innerText = `: ${Math.floor(data.main.temp)}°C`;
    container.append(cityContainer);
}

let arrayOfPromises = [];

for(let city in cities) {
    arrayOfPromises.push(getByCity(cities[city].name))
}

Promise.all(arrayOfPromises).then(data => data.map(item => renderCity(item)))