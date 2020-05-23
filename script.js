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
        fiveDay();
        $("#userInput").val("");
    })

    // Function for Current Day Weather Conditions
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

    // Function for UV Index
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

    // Function for 5 Day Forecast
    function fiveDay() {
        var cityFive = $("#userInput").val();
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityFive + '&units=imperial&APPID=666d531c4f692dda2c8468cb9e366c40',
            method: "GET",
            dataType: "json",
            success: function(data){
                // Clear each Div to get rid of previous info
                $("#dayOne").empty();
                $("#dayTwo").empty();
                $("#dayThree").empty();
                $("#dayFour").empty();
                $("#dayFive").empty();
                console.log(data);
                // Create Day 1 Variables
                var dateOne = data.list[4].dt_txt;
                var dateOne = dateOne.replace('15:00:00', ' ');
                var tempOne = "Temp: " + data.list[4].main.temp + " &#8457;";
                var humidityOne = "Humidity: " +  data.list[4].main.humidity + "%";
                // Append Day 1 Info to Day 1 Div
                $("#dayOne").append(dateOne);
                $("#dayOne").append(tempOne);
                $("#dayOne").append(humidityOne);

                // Create Day 2 Variables
                var dateTwo = data.list[12].dt_txt;
                var dateTwo = dateTwo.replace('15:00:00', ' ');
                var tempTwo = "Temp: " + data.list[12].main.temp + " &#8457;";
                var humidityTwo = "Humidity: " + data.list[12].main.humidity + "%";
                // Append Day 2 Info to Day 2 Div
                $("#dayTwo").append(dateTwo);
                $("#dayTwo").append(tempTwo);
                $("#dayTwo").append(humidityTwo);

                // Create Day 3 Variables
                var dateThree = data.list[20].dt_txt;
                var dateThree = dateThree.replace('15:00:00', ' ');
                var tempThree = "Temp: " + data.list[20].main.temp + " &#8457;";
                var humidityThree = "Humidity: " + data.list[20].main.humidity + "%";
                // Append Day 3 Info to Day 3 Div
                $("#dayThree").append(dateThree);
                $("#dayThree").append(tempThree);
                $("#dayThree").append(humidityThree);

                // Create Day 4 Variables
                var dateFour = data.list[28].dt_txt;
                var dateFour = dateFour.replace('15:00:00', ' ');
                var tempFour = "Temp: " + data.list[28].main.temp + " &#8457;";
                var humidityFour = "Humidity: " + data.list[28].main.humidity + "%";
                // Append Day 4 Info to Day 4 Div
                $("#dayFour").append(dateFour);
                $("#dayFour").append(tempFour);
                $("#dayFour").append(humidityFour);

                // Create Day 5 Variables
                var dateFive = data.list[36].dt_txt;
                var dateFive = dateFive.replace('15:00:00', ' ');
                var tempFive = "Temp: " + data.list[36].main.temp + " &#8457;";
                var humidityFive = "Humidity: " + data.list[36].main.humidity + "%";
                // Append Day 5 Info to Day 5 Div
                $("#dayFive").append(dateFive);
                $("#dayFive").append(tempFive);
                $("#dayFive").append(humidityFive);
            }
        })
    }
})

