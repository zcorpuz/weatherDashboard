$(document).ready(function(){

    // Global Variables
    var cities = [];

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
            }
        })
    }


    // Function that gets UV Index
    // function cityUV() {
    //     // Ajax Call
    //     $.ajax({
    //         url: 'http://api.openweathermap.org/data/2.5/uvi/forecast?appid=666d531c4f692dda2c8468cb9e366c40&lat=' + cityLat + '&lon=' + cityLon,
    //         method: "GET",
    //         dataType: "jsonp",
    //         success: function(data){
    //             console.log(url);
    //         }
    //     })
    // }

})

