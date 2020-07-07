import {cities} from './cityData.js';
import { getforecastCity } from './api.js';

const selectedCity = localStorage.getItem('selectedCity');

if(selectedCity) {
    renderForecast(selectedCity);
} else {
    alert('Please, select a city from the main page!');
} 

function renderForecast(citiesKey) {
    getforecastCity(cities[citiesKey].name).then(data => {

        return data.list.reduce((accumulator, item) => {
            const dateKeys = new Date(item.dt_txt).getDate();
            if(!accumulator[dateKeys]) {
                accumulator[dateKeys] = [];
            }
            accumulator[dateKeys].push(item);
            return accumulator;
        }, {})

    }).then(result => {
        for(let day in result) {
            displayForecastWeather(result[day]);
        }
    })
}

function displayForecastWeather(data) {
    data.map(item => {
        const fixedTime = new Date(item.dt_txt).getHours();
        if(fixedTime === 12) {
            let getCityName = document.querySelector('.city-name')
            let forecastContainer = document.querySelector('.forecast-box');
            let dailyForecastContainer = document.createElement('div');
            let getDay = document.createElement('span');
            let getMonth = document.createElement('span');
            let getIcon = document.createElement('div');
            let getTemp = document.createElement('span');
            let infoDescription = document.createElement('span');
            let getHumidity = document.createElement('span');
            let getPressure = document.createElement('span');
            
            dailyForecastContainer.setAttribute('class', 'forecast-box__daily');
            getDay.setAttribute('id', 'date');
            getMonth.setAttribute('id', 'month');
            getIcon.setAttribute('id', 'icon-forecast');
            getTemp.setAttribute('id', 'temp');

            ///***  formating the date  ****/    

            let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(item.dt_txt).getDay()]
            let dayNumber = new Date(item.dt_txt).getDate();
            let month = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."][new Date(item.dt_txt).getMonth()];
            
            getDay.innerText = day; 
            getMonth.innerText = dayNumber + ' ' + month;
            getCityName.innerText = cities[selectedCity].name;
            getIcon.innerHTML = `<img src="images/${item.weather[0].icon}.png" alt="icon"/>`;
            getTemp.innerHTML = `${Math.floor(item.main.temp)}°C`;
            infoDescription.innerText = item.weather[0].description;
            getHumidity.innerText = `Humidity: ${item.main.humidity}%`;
            getPressure.innerText = `Pressure: ${item.main.pressure}mb`;
            
            dailyForecastContainer.append(getDay);
            dailyForecastContainer.append(getMonth);
            dailyForecastContainer.append(getIcon);
            dailyForecastContainer.append(getTemp);
            dailyForecastContainer.append(infoDescription);
            dailyForecastContainer.append(getHumidity);
            dailyForecastContainer.append(getPressure);
            forecastContainer.append(dailyForecastContainer);
        }
    });
}