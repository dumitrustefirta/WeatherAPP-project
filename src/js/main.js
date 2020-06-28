import '../styles/styles.scss';
import {cities} from './cityData.js';
import { getByCity } from './api.js';

const weatherContainer = document.querySelector(".container");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

const weather = {};

weather.temperature = {
    unit : "celsius"
}

/////********* Show todays date *****/////////

const dateElement = document.getElementById('date');
const optionsDate = {weekday : "short", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", optionsDate);

/////********* localStorage ******////////

function renderSelectedCity(citiesKeys) {
    let cityImage = cities[citiesKeys].url;
    let image = document.getElementById('image-placeholder');
    image.setAttribute('src', cityImage);

    getByCity(cities[citiesKeys].name)
        .then(data => renderWeather(data))
        .then(function(){
            displayWeather()
        })
        .catch(error => console.log(error));
}

weatherContainer.style.display = 'none';

/////////******* selecting city and fetch data weather ****/////

function selectCity(cities) {
    const select = document.getElementById('select_city');
    const selectBox = document.createElement('select');

    selectBox.setAttribute('id', 'select_box');

    let emptyOption = document.createElement('option');
    emptyOption.setAttribute('value', 'none');
    emptyOption.innerText = '--select city--';

    selectBox.append(emptyOption);

    for (const city in cities) {
        let option = document.createElement('option');
        option.setAttribute('value', city)
        option.setAttribute('id', city)
        option.innerText = cities[city].name;
        
        selectBox.append(option);
    }
       
    selectBox.addEventListener('change', (event) => {
        let citiesKeys = event.target.value;
        if(citiesKeys === undefined) {
            console.log('fuck');
        }
        renderSelectedCity(citiesKeys);
        localStorage.setItem('selectedCity', citiesKeys);
        // CALL API FOR CITY DATA

        
    })
    select.append(selectBox);
}

function renderWeather(data) {
    weather.temperature.value = Math.floor(data.main.temp);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
}

////******* displaying data weather *********///////

function displayWeather(){
    weatherContainer.style.display = 'block';
    iconElement.innerHTML = `<img src="images/${weather.iconId}.png" alt="icon"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°C`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
    
selectCity(cities);

/////********* localStorage ******////////

const selectedCity = localStorage.getItem('selectedCity');

if(selectedCity) {
    let selectedCityElement = document.getElementById(selectedCity)
    if(selectedCityElement){
        selectedCityElement.selected = true
        renderSelectedCity(selectedCity);
    } 
} else {
    console.log('...simple flow');
}