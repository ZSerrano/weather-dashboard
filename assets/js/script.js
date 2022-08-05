// Pseudocode

// Create a Search bar that takes an input and saves it to local storage.

// This input is also saved as a clickable button so the user can go back to 
// past searches.  All buttons and input can be on left side of page.

// Right side includes two sections: top piece for certain pieces of information
// in the currently searched city, and bottom piece showing the five day forecast
// for the same location.
var apiKey = '768e5ecb743a4297ff5e9f4b1974e4c3'
// Top section 'header' will include the city name, date, and icon for the current weather conditions.
$('#searchButton').on('click',function() {
    locationInput($('#inputCity').val())
    
})

// Location function to pull latitue and longitude from geotracking api based on city name
function locationInput(entry) {
    var lati;
    var long;
    var searchUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${entry}&limit=1&appid=${apiKey}`;
    fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
        lati = data[0].lat
        long = data[0].lon
        // Runs forecast function passing in latitude and longitude variables
        weatherForecast(lati,long)
  })
}
// Forecast function runs based on latitude and longitude taken from geotracking api
function weatherForecast(lat, lon) {
    
    var weatherData = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(weatherData)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var today = $('#currentDay');
        // city name
        var currentCity = $('#inputCity').val();
        // date
        var date = new Date(data.current.dt * 1000);
        var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
        var year = date.getFullYear();
        var currentDateDiv = $('<div>')
        var currentDate = month + '/' + day + '/' + year;
        currentDateDiv.text(currentDate);
        // weather icon
        var weatherIconDiv = $('<div>')
        var weatherIcon = data.current.weather.icon;
        weatherIconDiv.append(weatherIcon)
        // current temp
        var currentTemp = data.current.temp;
        var currentTempDiv = $('<div>')
        currentTempDiv.text(currentTemp)
        // humidity
        var currentHumid = data.current.humidity;
        var currentHumidDiv = $('<div>')
        currentHumidDiv.text(currentHumid)
        // wind speed
        var windSpeed = data.current.wind_speed;
        var windSpeedDiv = $('<div>')
        windSpeedDiv.text(windSpeed)
        // uv index
        var uv = data.current.uvi;
        var uvDiv = $('<div>')
        uvDiv.text(uv)
        // uv index is colored based on conditions (favorable, moderate, or severe)

        // Appends all divs to the same container on the page
        today.append(currentCity, currentDateDiv, weatherIconDiv, currentTempDiv, currentHumidDiv, windSpeedDiv, uvDiv);

    })
    
    // var forecastData = `forecastapi`
    // fetch(forecastData)
    // .then(response => response.json()
    // .then(data => {
    //     var future = $('#forecast');
    //     // create 5 cards. each card will display:
    //     // date
    //     // weather icon
    //     // future average temp
    //     // wind speed
    //     // humidity
    // }))
}

