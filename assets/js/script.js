// Pseudocode

// Create a Search bar that takes an input and saves it to local storage.

// This input is also saved as a clickable button so the user can go back to 
// past searches.  All buttons and input can be on left side of page.

// Right side includes two sections: top piece for certain pieces of information
// in the currently searched city, and bottom piece showing the five day forecast
// for the same location.

// Top section 'header' will include the city name, date, and icon for the current weather conditions.
$('#search').on('click',function() {
    locationInput($('#inputCity').val())
    // set value to local storage
    // 
})

function locationInput(entry) {
    var lati;
    var long;
    var searchUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${entry}&limit=1&appid=768e5ecb743a4297ff5e9f4b1974e4c3`;
// need to figure out code to make sure ${entry} is being read properly
    fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
        lati = data[0].lat
        long = data[0].lon
        weatherForecast(lati,long)
  })
}

function weatherForecast(lat, lon) {
    var weatherData = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=768e5ecb743a4297ff5e9f4b1974e4c3`;
    fetch(weatherData)
    .then(response => response.json())
    .then(data => {
        var today = $('#currentDay');
        // city name
        var currentCity = $('#inputCity').val();
        // date
        var date = new Date(data.current.dt * 1000);
        var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
        var year = date.getFullYear();
        var currentDate = month + '/' + day + '/' + year;
        // weather icon
        var weatherIcon = data.current.weather.icon;
        // current temp
        var currentTemp = data.current.temp;
        // humidity
        var currentHumid = data.current.humidity;
        // wind speed
        var windSpeed = data.current.wind_speed;
        // uv index
        var uv = data.current.uvi;
        // uv index is colored based on conditions (favorable, moderate, or severe)
        today.append(currentCity, currentDate, weatherIcon, currentTemp, currentHumid, windSpeed, uv);

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

