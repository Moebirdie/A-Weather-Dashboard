let stateString;
let valueToFetchWeather;
let lat;
let lon;
let fetchData;
let fetchDataFiveDays;

function getStateString(state) {
    if (state === "") {
        stateString = "";
        return stateString;
    }
    else {
        stateString = `${state},`;
        return stateString;
    }
    console.log(stateString);
}

function searchLocation() {
    var cityInput = document.getElementById("locationCity");
    var cityVal = cityInput.value;
    var cityEncodedVal = encodeURIComponent(cityVal);
    var cityToFetch = `${cityEncodedVal},`;
    var stateInput = document.getElementById("locationState");
    var stateValue = stateInput.value;
    var countryInput = document.getElementById("countrySelect");
    var countryValue = countryInput.value;

    getStateString(stateValue);

    valueToFetchCoord = `${cityToFetch}${stateString}${countryValue}`
    console.log(cityEncodedVal, countryValue, valueToFetchCoord);

    getWeather(valueToFetchCoord);
}

const apiKey = 'c65a83f1b41423a44ca059c4924fe1cd';


//Call the weather to get lat and lon

function getWeather() {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${valueToFetchCoord}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        // Extract the coordinates of the location
        fetchData = data;
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        localStorage.setItem(valueToFetchCoord,JSON.stringify({lat:lat,lon:lon}));
        console.log(data, data.dt);
        console.log(lat, lon);
        console.log("first fetch");
        createCurrentWeatherDiv();
        setForecastHeading();
        getFiveDayCardData(valueToFetchCoord); 
    })
   
}    

function createCurrentWeatherDiv() {
     console.log(fetchData);
     var currTempCalc = Math.round(fetchData.main.temp);
     var currWindMPH = Math.round(fetchData.wind.speed);
     var currDate = (new Date(fetchData.dt*1000));
     var currDateDisplay = (currDate.toLocaleDateString("en-US"));
     var currDisplay = document.getElementById('current-display');

     var currTitleEl = document.createElement('h2');
     var currTempEl = document.createElement('p');
     var currWindEl = document.createElement('p');
     var currHumidityEl = document.createElement('p');
          
     var currentTitleData = `${fetchData.name} (${currDateDisplay})`;
     var currentTempData = `Temp:\u00A0\u00A0${currTempCalc}\u00A0\u00B0F`;
     var currentWindData = `Wind:\u00A0\u00A0${currWindMPH}\u00A0MPH`;
     var currentHumidityData = `Humidity:\u00A0\u00A0${fetchData.main.humidity}\u00A0%`;
          
     currTitleEl.textContent = currentTitleData;
     currTempEl.textContent = currentTempData;
     currWindEl.textContent = currentWindData;
     currHumidityEl.textContent = currentHumidityData;
     
     currDisplay.appendChild(currTitleEl);
     currDisplay.appendChild(currTempEl);
     currDisplay.appendChild(currWindEl);
     currDisplay.appendChild(currHumidityEl);

     currDisplay.setAttribute("class","current-display")

}

function setForecastHeading() {    
     var fiveDayHeading = document.getElementById('five-day-heading');
     var cardDivMainTitleEl = document.createElement('h2');
     cardDivMainTitleEl.textContent = "5 Day Forecast";
     fiveDayHeading.appendChild(cardDivMainTitleEl);
}

function getFiveDayCardData(valueToFetchCoord) {
   //fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latvar}&lon=${lonvar}&exclude=current,minutely,hourly&units=imperial&appid=${apiKey}`)
   fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${valueToFetchCoord}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`)
             .then(response2 => response2.json())
             .then(data2 => {
                console.log(data2);
                fetchDataFiveDays = data2;   
             createFiveDayCards();   
             })
 }

function createFiveDayCards() {
    console.log(fetchDataFiveDays);
  
    for (let i=1; i < 6; i++) {
        console.log("pink",fetchDataFiveDays);
        var cardTemp = Math.round(fetchDataFiveDays.list[i].main.temp);
        var cardWind = Math.round(fetchDataFiveDays.list[i].wind.speed);
        var cardDisplayEl = document.getElementById('card-display');

        var cardTitleEl = document.createElement('h3');
        var cardIcon = document.createElement("img");
        var cardTempEl = document.createElement('p');
        var cardWindEl = document.createElement('p');
        var cardHumidityEl = document.createElement('p');
        var cardDivEl = document.createElement('div');
        
        var cardDate = (new Date(fetchDataFiveDays.list[i].dt*1000));
        var cardDateDisplay = (cardDate.toLocaleDateString("en-US"));
        var cardTitleData = `${cardDateDisplay}`;
        var cardImageData = "https://picsum.photos/200";
        var cardTempData = `Temp:\u00A0\u00A0${cardTemp}\u00A0\u00B0F`;
        var cardWindData = `Wind:\u00A0\u00A0${cardWind}\u00A0MPH`;
        var cardHumidityData = `Humidity:\u00A0\u00A0${fetchDataFiveDays.list[i].main.humidity}\u00A0%`;
        
        cardTitleEl.textContent = cardTitleData;
        cardTempEl.textContent = cardTempData;
        cardWindEl.textContent = cardWindData;
        cardHumidityEl.textContent = cardHumidityData;

        cardDivEl.appendChild(cardTitleEl);
        cardDivEl.appendChild(cardIcon);
        cardDivEl.appendChild(cardTempEl);
        cardDivEl.appendChild(cardWindEl);
        cardDivEl.appendChild(cardHumidityEl);
        cardDisplayEl.appendChild(cardDivEl);

        cardDisplayEl.setAttribute("class","card-display");
        cardIcon.setAttribute("src", cardImageData);
//}
    }
}
// fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely&units=imperical&appid=${apiKey}`)
//             .then(response2 => response2.json())
//             .then(data2 => {
//                 console.log(data2);
//             })
//             .catch(error => { 
//                 console.log("error ");
//             })

// })
// }
    
// function makeCurrForecast(data) {    
//     var currDate = data.dt
//     console.log(currDate)  
// }

// Search button
document.getElementById("searchLocation").addEventListener("click", searchLocation);