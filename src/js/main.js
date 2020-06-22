import '../styles/styles.scss';
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

let myStorage = getCityFromLocalStorage();
myStorage === null ? myStorage = [] : myStorage;

function getCityFromLocalStorage() {
    return JSON.parse(localStorage.getItem('city'));
}

function setLocalStorCity(city) {
    localStorage.setItem('city', JSON.stringify(city))
}

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
        console.log(citiesKeys);

    /*   How to set display none for weather container when is...?????? 

        if (citiesKeys) {
            weatherContainer.style.display = 'block';
        } else {
            weatherContainer.style.display = 'none';
        } */


        let cityImage = cities[citiesKeys].url;
        let image = document.getElementById('image-placeholder');
        image.setAttribute('src', cityImage);

        myStorage.push({
            id: cities[citiesKeys].name,
            text: cities[citiesKeys].name,
        });

        setLocalStorCity(myStorage);

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
    //weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
}

////******* displaying data weather *********///////

function displayWeather(){
    // iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" alt="icon"/>`;
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