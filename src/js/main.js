import '../styles/styles.scss';
import './burger.js';
import {cities} from './cityData.js';
import { getByCity } from './api.js';

const weatherContainer = document.querySelector(".container");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

const weather = {};
const KELVIN = 273;

weather.temperature = {
    unit : "celsius"
}

/////********* Show todays date *****/////////

const dateElement = document.getElementById('date');
const optionsDate = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", optionsDate);

/////********* localStorage ******////////

let newLocalStorage = getLocalStorage();
//newLocalStorage === null ? newLocalStorage = [] : newLocalStorage;

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('city'));
}

function setLocalStorage(city) {
    localStorage.setItem('city', JSON.stringify(city))
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
        option.innerText = cities[city].name;
        
        selectBox.append(option);
    }
       
    selectBox.addEventListener('change', (event) => {
        let citiesKeys = event.target.value;
        let cityImage = cities[citiesKeys].url;
        let image = document.getElementById('image-placeholder');
        let newLocalStorage = [];
        image.setAttribute('src', cityImage);

        newLocalStorage.push({
            url: cities[citiesKeys].url,
            text: cities[citiesKeys].name,
        });

        setLocalStorage(newLocalStorage);

        // CALL API FOR CITY DATA

        getByCity(cities[citiesKeys].name)
            .then(response => response.json())
            .then(data => renderWeather(data))
            .then(function(){
                displayWeather()
            })
            .catch(error => console.log(error));
    })
    select.append(selectBox);
}

function renderWeather(data) {
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
}

////******* displaying data weather *********///////

function displayWeather(){
    weatherContainer.style.display = 'block';
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" alt="icon"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion

function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// to addEventListener on temp to convert it in fahrenheit///////
    
selectCity(cities);