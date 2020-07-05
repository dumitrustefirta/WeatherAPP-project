import {cities} from './cityData.js';
import { getforecastCity } from './api.js';

// function selectDropDownCity(cities) {
//     const container = document.querySelector('.main-forecast');
//     const selectDrop = document.createElement('select');
//     selectDrop.setAttribute('id', 'select__forecast');
    
//     let emptyoption = document.createElement('option');
//     emptyoption.setAttribute('value', 'none');
//     emptyoption.innerText = 'select city';

//     selectDrop.append(emptyoption);

//     for(const city in cities) {
//         let option = document.createElement('option');
//         option.setAttribute('value', city);
//         option.setAttribute('id', city);
//         option.innerText = cities[city].name;

//         selectDrop.append(option);
//     }

//     selectDrop.addEventListener('change', (event) => {
//         let citiesKey = event.target.value;
        
//         renderForecast(citiesKey);
//         localStorage.setItem('selectedForecast', citiesKey);
//     })
//     container.append(selectDrop);
// }

// selectDropDownCity(cities);

const selectedCity = localStorage.getItem('selectedCity');

if(selectedCity) {
    renderForecast(selectedCity);
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
            //let mainPage = document.querySelector('.main-forecast');
            let getCityName = document.querySelector('.city-name')
            let forecastContainer = document.querySelector('.forecast-box');
            let dailyForecastContainer = document.createElement('div');
            let getDay = document.createElement('span');
            let getIcon = document.createElement('div');
            let getTemp = document.createElement('span');
            let infoDescription = document.createElement('span');
            let getHumidity = document.createElement('span');
            let getPressure = document.createElement('span');
            
            dailyForecastContainer.setAttribute('class', 'forecast-box__daily');
            getDay.setAttribute('id', 'date');
            getIcon.setAttribute('id', 'icon-forecast');
            getTemp.setAttribute('id', 'temp');

            ///***  formating the date  ****/    

            let day = new Date(item.dt_txt).getDate();
            //let month = day.toLocaleString('default', { month: 'short' });
            let month = new Date(item.dt_txt).getMonth()+1;
            let year = new Date(item.dt_txt).getFullYear();
            let mm = month < 10 ? '0' + month : month;
            let dd = day < 10 ? '0' + day : day;

            getCityName.innerText = cities[selectedCity].name;
            getDay.innerText = dd + '.' + mm + '.' + year;
            getIcon.innerHTML = `<img src="images/${item.weather[0].icon}.png" alt="icon"/>`;
            getTemp.innerHTML = `${Math.floor(item.main.temp)}°C`;
            infoDescription.innerText = item.weather[0].description;
            getHumidity.innerText = `Humidity: ${item.main.humidity}%`;
            getPressure.innerText = `Pressure: ${item.main.pressure}mb`;
            
            dailyForecastContainer.append(getDay);
            dailyForecastContainer.append(getIcon);
            dailyForecastContainer.append(getTemp);
            dailyForecastContainer.append(infoDescription);
            dailyForecastContainer.append(getHumidity);
            dailyForecastContainer.append(getPressure);
            forecastContainer.append(dailyForecastContainer);
            
            //mainPage.append(getCityName);

        }
    });
}

///////********  localStorage *******////////////

// const selectedForecast = localStorage.getItem('selectedForecast');

// if(selectedForecast) {
//     let selectedForecastElement = document.getElementById(selectedForecast)
//     if(selectedForecastElement){
//         selectedForecastElement.selected = true
//         renderForecast(selectedForecast);
//     } 
// } else {
//     console.log('...simple flow');
// }