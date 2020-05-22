$(document).ready(function(){

    // Global Variables
    var cities = [];
    var lat = [];
    var lon = [];


    // Function that appends previous inputs into Div
    function pastCity() {
        // Empties Div so no repeats occur
        $("#previousInputs").empty();
        for (var i = 0; i < cities.length; i++) {
            var cityHEl = $("<h6>");
            cityHEl.text(cities[i]);
            $("#previousInputs").prepend(cityHEl);
        }
    }

    // Event for city search submission
    $("#submitBtn").on("click", function(event) {
        event.preventDefault();
        var userInput = $("#userInput").val().trim();
        cities.push(userInput);
        pastCity();
        cityInfo();
        $("#userInput").val("");
    })

    // Function that gets JSON value of city input
    function cityInfo() {
        // Put city of choice into a variable
        var city = $("#userInput").val();
        // Moment.js code
        var currentDate = moment().format("MMMM Do YYYY, h:mm a"); 
        // Ajax Call
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=666d531c4f692dda2c8468cb9e366c40',
            method: "GET",
            dataType: "jsonp",
            success: function(data){
                // Empties the divs to get rid of previous searches
                $("#cityInfo").empty();
                //Displays current city in H1 tag
                var h1El = $("<h1>");
                h1El.text(city);
                $("#cityInfo").append(h1El);
                // Displays current day
                var h3El = $("<h3>");
                h3El.text(currentDate);
                $("#cityInfo").append(h3El);
                // Create temperature data to display in div
                var temp = "Temperature: " + data.main.temp + " &#8457;"; 
                $("#cityInfo").append(temp);
                // Create humidity data to display in div
                var humidity = "Humidity: " + data.main.humidity + "%";
                $("#cityInfo").append(humidity);
                // Create wind speed data to display in div
                var windSpeed = "Wind Speed: " + data.wind.speed + " MPH";
                $("#cityInfo").append(windSpeed);
                lat.push(data.coord.lat);
                lon.push(data.coord.lon);
                // Calling cityUV Function in here because of event loop ordering
                cityUV();
                // Splice both arrays so that it gets rid of previous lat and lon coordinates
                lat.splice(0,1);
                lon.splice(0,1);
            }
        })
    }

    // Function that gets UV Index
    function cityUV() {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat[0] + '&lon=' + lon[0] + '&appid=666d531c4f692dda2c8468cb9e366c40',
            method: "GET",
            dataType: "json",
            success: function(data){
                // Create variable for uvi and append to div
                var uvi = "UVI Index: " + data.value + "";
                $("#cityInfo").append(uvi);
            }
        })
    }
})

