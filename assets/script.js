let stateString;
let valueToFetchWeather;
let lat;
let lon;
let fetchData;

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
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${valueToFetchCoord}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        // Extract the coordinates of the location
        fetchData = data;
        lat=data.coord.lat;
        lon=data.coord.lon;
        console.log(fetchData);
        localStorage.setItem(valueToFetchCoord,JSON.stringify({lat:lat,lon:lon}));
        console.log(data, data.dt);
        console.log(lat, lon);
        console.log("first fetch");
    })
createCurrentWeatherDiv();    
}    

function createCurrentWeatherDiv() {
    var currDate = (fetchData.dt*1000);
    console.log(currDate, typeofCurrDate);
    // var currDateDisplay = currDate.toLocaleDateString("en-US");
    // var currDisplay = document.getElementById('current-display');
    // var currentTitleEl = document.createElement('h2');
    // var currentTitleData = fetchData.name+" "+data2.list.dt_text[0];
    // currentTitleEl.textContent(currentTitleData);
    // currDisplay.appendChild(currentTitleEl);
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