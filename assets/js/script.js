// Pseudocode

// Create a Search bar that takes an input and saves it to local storage.

// This input is also saved as a clickable button so the user can go back to 
// past searches.  All buttons and input can be on left side of page.

// Right side includes two sections: top piece for certain pieces of information
// in the currently searched city, and bottom piece showing the five day forecast
// for the same location.

// Top section 'header' will include the city name, date, and icon for the current weather conditions.
$('#searchButton').on('click',function() {
    locationInput($('').val())
    // set value to local storage
    // 
})

function locationInput(entry) {
    var lati;
    var long;
    // var searchUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=${entry}&limit=1&appid=768e5ecb743a4297ff5e9f4b1974e4c3';
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
    // var weatherData = 'openweatherapi'
    fetch(weatherData)
    .then(response => response.json())
    .then(data => {
        var today = $('#currentDay');
        // city name
        // date
        // weather icon
        // current temp
        // humidity
        // wind speed
        // uv index
        // uv index is colored based on conditions (favorable, moderate, or severe)
        var future = $('#forecacst');
        // create 5 cards. each card will display:
        // date
        // weather icon
        // future average temp
        // wind speed
        // humidity

    })
}

