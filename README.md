# Weather Dashboard
Weather Dashboard is designed to demonstrate knowledge of using a third party API.  This project uses the OpenWeatherMap API, a robust weather API providing various API calls to obtain both geolocation and weather forecasts.  This API also integrates with Leaflet.js and other mapping libraries.  This can be seen in the 'Oh My Stars' project, a collaborative class project, in my porfolio. (My Portfolio) Nested variables included in OpenWeatherMap API responses encourage use of additional javascript skills. This project also utilizes local storage to maintain a history of previous searches.  This particular version of the Weather Dashboard includes the ability to include a state and country in the search criteria.  This allows the user to specify a state for cities such as Portland which can refer to both Portland, Oregon or Portland, Maine.  The ability to enter a country also helps specify the location for cities such as Lima which exists in both Peru and Ohio. 

The live version of this application can be seen at: https://moebirdie.github.io/A-Weather-Dashboard/  
The Github respository can be found at: https://github.com/Moebirdie/A-Weather-Dashboard



## Installation
Weather Dashboard is a browser based application that can be accessed by navigating to Weather Dashboard.


## Usage
When the user navigates to the Weather Dashboard, they are presented with three search inputs and a search button.  Upon entering a value into the city input, (state and country are optional) and pressing the search button the user is presented with the following:
  - The searched city name and date display at the top of the screen
  - The temperature is prominently displayed along with an icon depicting current weather conditions
  - The wind speed and humidity is also displayed in the current weather section

  - Below the current weather, the five day forecast is displayed
  - The five day forecast is displayed on individual cards with a background reflecting the forecasted weather
  - The card contains the following information:
      - Date
      - Temperature
      - Related icon
      - Wind speed
      - Humidity
      - Short description

 - Once search has been pressed for the first time, a history of all previous searches displays and persists until the page is refreshed
 - New historical searches are added with each press of the search button
 - Historical buttons can be pressed to return the weather from that specific previous search

 - A clear previous history button has been added to clear all of the search history


## Visual Description

### Navigate to the Weather Dashboard
![weatherDash](https://github.com/Moebirdie/A-Weather-Dashboard/assets/93432701/bf39c37f-a37c-4a5e-8c3d-47a4121be68a)

### After search button clicked
![loadedWeatherDash](https://github.com/Moebirdie/A-Weather-Dashboard/assets/93432701/f917f3d1-39b4-41b0-a17e-a33bf2459bf1)

### After clear previous history button is clicked
![weatherDash](https://github.com/Moebirdie/A-Weather-Dashboard/assets/93432701/515c1e29-5b30-4a11-95d8-3ca5655549e1)


## Additional Notes
This Weather Dashboard was completed after the "Oh My Stars" project. I wrote the code for retrieving and displaying the weather in the "Oh My Stars" application, so you will see some similaries in the weather functions. 


## License
[MIT](https://choosealicense.com/licenses/mit/)`  
