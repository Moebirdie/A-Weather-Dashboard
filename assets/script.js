let stateString;
let valueToFetchWeather;
let lat;
let lon;
let fetchData;
let fetchDataFiveDays;

function getStateString(state) {
    if (state === "") {
        stateString = "";
        console.log(stateString);
        return stateString;
    }
    else {
        stateString = `${state},`;
        console.log(stateString);
        return stateString;
    }
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
    localStorage.setItem(cityVal,valueToFetchCoord);
    createPage();
    getWeather(valueToFetchCoord);
    cityInput.value = "";
    stateInput.value = "";
    countryInput.value = "";
}
function createPage() {
    removeAllWeatherInfo();
    setForecastHeading();
    makeHistoryButtons();
}

function makeHistoryButtons() {
    var inputs = Object.keys(localStorage);
    var cities = {};
    for (i=0; i < inputs.length; i++) {
        var input = inputs[i];
        var value = localStorage.getItem(input);
        cities[inputs] = value;
        var historyButtons = document.getElementById('historyButtons');
        var historyBtn = document.createElement('button');
        historyBtn.textContent = input;
        historyButtons.appendChild(historyBtn);
        historyBtn.setAttribute("class","history-btn");
        historyBtn.setAttribute("data-input",input);
    }
    console.log(inputs,input, value[i])
 }
 function clearInputs() {
    var clearCity = document.get
 }

const apiKey = 'c65a83f1b41423a44ca059c4924fe1cd';


//Call the weather to get lat and lon

async function getWeather(valueToFetchCoord) {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${valueToFetchCoord}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Extract the coordinates of the location
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            console.log(data, data.dt);
            console.log(lat, lon);
            console.log("first fetch");
            currentWeather = data;
            createCurrentWeatherDiv();
            getFiveDayForecast(lat, lon);
       })
        .catch(error => console.log(error));
}

function setForecastHeading() {
    var fiveDayHeading = document.getElementById('five-day-heading');
    var cardDivMainTitleEl = document.createElement('h2');
    cardDivMainTitleEl.textContent = "5 Day Forecast";
    fiveDayHeading.appendChild(cardDivMainTitleEl);
}

  async function getFiveDayForecast(lat, lon) {
        await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                forecastData = data;
                getWeatherDays();
            })
    }

function getWeatherDays() {
    var forecastObj = forecastData.list;
    forecastDays = [];
    for (i = 0; i < (forecastObj).length; i++) {
        var fullTextDate = forecastObj[i].dt_txt;
        console.log(fullTextDate);
        var textArray = fullTextDate.split(" ");
        var dayDate = textArray[0];
        var dayHours = textArray[1];
        if (dayHours === '21:00:00') {
            forecastDays.push(forecastObj[i]);
            console.log(forecastDays, dayDate, dayHours)
        }
    }
    makeForecastCards();
}

function createCurrentWeatherDiv() {
    console.log(currentWeather);
    var currTempCalc = Math.round(currentWeather.main.temp);
    var currWindMPH = Math.round(currentWeather.wind.speed);

    var currDate = (new Date(currentWeather.dt * 1000));
    var currDateDisplay = (currDate.toLocaleDateString("en-US"));
    var currDisplay = document.getElementById('current-display');

    var currTitleEl = document.createElement('h2');
    var currTempDiv = document.createElement('div');
    var currTempEl = document.createElement('h1');
    var currWeatherDiv = document.createElement('div');
    var currWeatherStats = document.createElement('div');
    var currWindEl = document.createElement('p');
    var currHumidityEl = document.createElement('p');
    var currWeatherIcon = document.createElement('img');

    var currentTitleData = `${currentWeather.name} (${currDateDisplay})`;
    var currentTempData = `${currTempCalc}\u00B0F`;
    var currentWindData = `Wind:\u00A0\u00A0${currWindMPH}\u00A0MPH`;
    var currentHumidityData = `Humidity:\u00A0\u00A0${currentWeather.main.humidity}\u00A0%`;

    currTitleEl.textContent = currentTitleData;
    currTempEl.textContent = currentTempData;
    currWindEl.textContent = currentWindData;
    currHumidityEl.textContent = currentHumidityData;

    currDisplay.appendChild(currTitleEl);
    currTempDiv.appendChild(currTempEl);
    currWeatherStats.appendChild(currWeatherIcon);
    currWeatherStats.appendChild(currWindEl);
    currWeatherStats.appendChild(currHumidityEl);
    currWeatherDiv.appendChild(currTempDiv);
    currWeatherDiv.appendChild(currWeatherStats);
    currDisplay.appendChild(currWeatherDiv);

    currDisplay.setAttribute("class", "current-display");
    currWeatherDiv.setAttribute("class", "currentWeatherDiv");
    currWeatherIcon.setAttribute("src", `http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`);

}

function makeForecastCards() {
    var forecastCard = document.getElementById('forecast-cards');
    for (i = 0; i < forecastDays.length; i++) {
        var forecastDate = dayjs(((forecastDays[i].dt)-14400) * 1000).format('MM/DD/YYYY'); //9pm date-time second upd +1 day(86400)- 20 hrs(72000) - 4 hrs utc adj(14400)
        var forecastIcon = forecastDays[i].weather[0].icon;
        var forecastDesc = forecastDays[i].weather[0].description;
        var forecastHumidity = forecastDays[i].main.humidity;
        var forecastWind = Math.round(forecastDays[i].wind.speed);
        var forecastTemp = Math.round(forecastDays[i].main.temp);
        var forecastDivEl = document.createElement("div");
        var forecastTitleEl = document.createElement("h3");
        var forecastIconEl = document.createElement("img");
        var forecastTempEl = document.createElement("p");
        var forecastHumidEl = document.createElement("p");
        var forecastWindEl = document.createElement("p");
        var forecastDescEl = document.createElement("p");

        forecastTitleEl.textContent = forecastDate;
        forecastTempEl.textContent = `Temp:\u00A0\u00A0${forecastTemp}\u00B0F`;
        forecastHumidEl.textContent = `Humidity:\u00A0\u00A0${forecastHumidity}%`;
        forecastWindEl.textContent = `Wind Speed:\u00A0\u00A0${forecastWind}\u00A0mph`;
        forecastDescEl.textContent = `Summary:\u00A0\u00A0${forecastDesc}`;

        forecastIconEl.setAttribute("src", `http://openweathermap.org/img/w/${forecastIcon}.png`);
        forecastIconEl.setAttribute("class", "card-icons");

        forecastDivEl.append(forecastTitleEl);
        forecastDivEl.append(forecastIconEl);
        forecastDivEl.append(forecastTempEl);
        forecastDivEl.append(forecastHumidEl);
        forecastDivEl.append(forecastWindEl);
        forecastDivEl.append(forecastDescEl);
        forecastCard.append(forecastDivEl);

        forecastDivEl.setAttribute("class", "card");
        
        if (forecastDesc.includes('rain')) {
            forecastDivEl.setAttribute("style", "background-image:url('./assets/images/newdrizzle.jpg')");
        }
        else if (forecastDesc.includes('snow')) {
            forecastDivEl.setAttribute("style", "background-image:url('./assets/images/newsnow.png')"); 
        }
        else if (forecastDesc.includes('thunderstorm')) {
            forecastDivEl.setAttribute("style", "background-image:url('./assets/images/newthunder.png')"); 
        }
        else if (forecastDesc.includes('drizzle')) {
            forecastDivEl.setAttribute("style", "background-image:url('./assets/images/newdrizzle.jpg')"); 
        }
        else if (forecastDesc.includes('clouds')) {
            forecastDivEl.setAttribute("style", "background-image:url('./assets/images/newcloudy1.jpg')"); 
        }
        else if (forecastDesc.includes('sunny')) {
            forecastDivEl.setAttribute("style", "background-image:url('./assets/images/newsunny.jpg')"); 
        }
        else {
            forecastDivEl.setAttribute("style", "background-image:url('./assets/images/newsunny.jpg')"); 
        }
    }
}

function removeAllWeatherInfo() {
    removeHistoryButtons();
    var currentDisplay = document.getElementById('current-display');
    var displayChildren = currentDisplay.children;
    if (displayChildren === null) {
    console.log("no data to clear");
    } else {
    while (displayChildren.length > 0 ) {
        currentDisplay.removeChild(displayChildren[0]);
       }
    }
    var fiveDayHead = document.getElementById('five-day-heading');
    var fiveDayChildren = fiveDayHead.children;
    if (fiveDayChildren === null) {
    console.log("no data to clear");
    } else {
    while (fiveDayChildren.length > 0 ) {
        fiveDayHead.removeChild(fiveDayChildren[0]);
       }
    }
    var foreCastCards = document.getElementById('forecast-cards');
    var forecastChildren = foreCastCards.children;
    if (forecastChildren === null) {
    console.log("no data to clear");
    } else {
    while (forecastChildren.length > 0 ) {
        foreCastCards.removeChild(forecastChildren[0]);
       }
    }
 } 
 function removeHistoryButtons() {
    var allHistoryButtons = document.querySelector('.history-buttons');
    var historyChildren = allHistoryButtons.children
    if (historyChildren === null) {
        console.log("no data to clear");
        } else {
        while (historyChildren.length > 0 ) {
            allHistoryButtons.removeChild(historyChildren[0]);
           }
        }
 }    

var historyButtons = document.querySelector('.history-buttons');
historyButtons.addEventListener("click",function(event) {
    var selectedButton = event.target;
    const selectedCity = selectedButton.getAttribute("data-input");
    const selectedValue = localStorage.getItem(selectedCity);
    removeHistoryButtons();
    createPage();
    getWeather(selectedValue);
})



// Search button
document.getElementById("searchLocation").addEventListener("click", searchLocation);



