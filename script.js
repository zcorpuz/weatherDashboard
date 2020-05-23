$(document).ready(function(){

    // Global Variables
    var cities = [];
    var lat = [];
    var lon = [];

    clickEvent();
    
    // Event for city search submission
    function clickEvent() {
        $("#submitBtn").on("click", function(event) {
            event.preventDefault();
            var userInput = $("#userInput").val().trim();
            cities.push(userInput);
            pastCity();
            cityInfo();
            fiveDay();
            $("#userInput").val("");
        });
    }
    
    // Function for Appending Previous Searches into Div
    function pastCity() {
        // Empties Div so no repeats occur
        $("#previousInputs").empty();
        for (var i = 0; i < cities.length; i++) {
            // Creates button for previous cities
            var cityBtn = $("<button>");
            // Add appropriate classes and attributes
            cityBtn.text(cities[i]);
            cityBtn.addClass("btn btn-light");
            cityBtn.attr('type', 'button');
            cityBtn.attr('id', 'submitBtn');
            // Adds button to Divs
            $("#previousInputs").prepend(cityBtn);
        }
    }

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
                $("#cityName").empty();
                $("#cityDate").empty();
                $("#cityTemp").empty();
                $("#cityHumid").empty();
                $("#cityWind").empty();
                //Displays current city in H1 tag
                var h1El = $("<h1>");
                h1El.text(city);
                $("#cityName").append(h1El);

                var iconCurrent = data.weather[0].icon;
                var iconUrlCurrent = "http://openweathermap.org/img/w/" + iconCurrent + ".png";
                $("#iconCurrent").attr('src', iconUrlCurrent);

                // Displays current day
                var h3El = $("<h3>");
                h3El.text(currentDate);
                $("#cityDate").append(h3El);
                // Create temperature data to display in div
                var temp = "Temperature: " + data.main.temp + " &#8457;"; 
                $("#cityTemp").append(temp);
                // Create humidity data to display in div
                var humidity = "Humidity: " + data.main.humidity + "%";
                $("#cityHumid").append(humidity);
                // Create wind speed data to display in div
                var windSpeed = "Wind Speed: " + data.wind.speed + " MPH";
                $("#cityWind").append(windSpeed);

                // Pushing Latitude and Longitude coordinates into array for UV API
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
                // Empty UV Div
                $("#uvIndex").empty();
                // Create variable for uvi and append to div
                var uviValue = data.value;
                var uvi = "UVI Index: " + data.value + "";
                $("#uvIndex").append(uvi);

                if (uviValue <= 2.99) {
                    $("#uvIndex").css("background-color", "green");
                    $("#uvIndex").css("width", "9%");
                    $("#uvIndex").css("padding-left", "4px");
                    $("#uvIndex").css("color", "white");
                }else if (uviValue >= 3 && uviValue <= 5.99) {
                    $("#uvIndex").css("background-color", "yellow");
                    $("#uvIndex").css("width", "9%");
                    $("#uvIndex").css("padding-left", "4px");
                    $("#uvIndex").css("color", "white");
                }else if (uviValue >= 6 && uviValue <= 7.99) {
                    $("#uvIndex").css("background-color", "orange");
                    $("#uvIndex").css("width", "9%");
                    $("#uvIndex").css("padding-left", "4px");
                    $("#uvIndex").css("color", "white");
                }else if (uviValue >= 8 && uviValue <= 10.99) {
                    $("#uvIndex").css("background-color", "red");
                    $("#uvIndex").css("width", "10%");
                    $("#uvIndex").css("padding-left", "4px");
                    $("#uvIndex").css("color", "white");
                }else if (uviValue >= 11) {
                    $("#uvIndex").css("background-color", "purple");
                    $("#uvIndex").css("width", "10%");
                    $("#uvIndex").css("padding-left", "4px");
                    $("#uvIndex").css("color", "white");
                }
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
                $("#dateOne").empty();
                $("iconOne").empty();
                $("#tempOne").empty();
                $("#humidOne").empty();
                $("#dateTwo").empty();
                $("iconTwo").empty();
                $("#tempTwo").empty();
                $("#humidTwo").empty();
                $("#dateThree").empty();
                $("iconThree").empty();
                $("#tempThree").empty();
                $("#humidThree").empty();
                $("#dateFour").empty();
                $("iconFour").empty();
                $("#tempFour").empty();
                $("#humidFour").empty();
                $("#dateFive").empty();
                $("iconFive").empty();
                $("#tempFive").empty();
                $("#humidFive").empty();
                // Create Day 1 Variables
                var dateOne = data.list[4].dt_txt;
                var iconOne = data.list[4].weather[0].icon;
                var iconUrlOne = "http://openweathermap.org/img/w/" + iconOne + ".png";
                var dateOne = dateOne.substr(0, 10);
                var tempOne = "Temp: " + data.list[4].main.temp + " &#8457;";
                var humidityOne = "Humidity: " +  data.list[4].main.humidity + "%";
                // Append Day 1 Info to Day 1 Div
                $("#dateOne").append(dateOne);
                $("#iconOne").attr('src', iconUrlOne);
                $("#iconOne").append(iconOne);
                $("#tempOne").append(tempOne);
                $("#humidOne").append(humidityOne);

                // Create Day 2 Variables
                var dateTwo = data.list[12].dt_txt;
                var iconTwo = data.list[12].weather[0].icon;
                var iconUrlTwo = "http://openweathermap.org/img/w/" + iconTwo + ".png";
                var dateTwo = dateTwo.substr(0, 10);
                var tempTwo = "Temp: " + data.list[12].main.temp + " &#8457;";
                var humidityTwo = "Humidity: " + data.list[12].main.humidity + "%";
                // Append Day 2 Info to Day 2 Div
                $("#dateTwo").append(dateTwo);
                $("#iconTwo").attr('src', iconUrlTwo);
                $("#tempTwo").append(tempTwo);
                $("#humidTwo").append(humidityTwo);

                // Create Day 3 Variables
                var dateThree = data.list[20].dt_txt;
                var iconThree = data.list[20].weather[0].icon;
                var iconUrlThree = "http://openweathermap.org/img/w/" + iconThree + ".png";
                var dateThree = dateThree.substr(0, 10);
                var tempThree = "Temp: " + data.list[20].main.temp + " &#8457;";
                var humidityThree = "Humidity: " + data.list[20].main.humidity + "%";
                // Append Day 3 Info to Day 3 Div
                $("#dateThree").append(dateThree);
                $("#iconThree").attr('src', iconUrlThree);
                $("#tempThree").append(tempThree);
                $("#humidThree").append(humidityThree);

                // Create Day 4 Variables
                var dateFour = data.list[28].dt_txt;
                var iconFour = data.list[28].weather[0].icon;
                var iconUrlFour = "http://openweathermap.org/img/w/" + iconFour + ".png";
                var dateFour = dateFour.substr(0, 10);
                var tempFour = "Temp: " + data.list[28].main.temp + " &#8457;";
                var humidityFour = "Humidity: " + data.list[28].main.humidity + "%";
                // Append Day 4 Info to Day 4 Div
                $("#dateFour").append(dateFour);
                $("#iconFour").attr('src', iconUrlFour);
                $("#tempFour").append(tempFour);
                $("#humidFour").append(humidityFour);

                // Create Day 5 Variables
                var dateFive = data.list[36].dt_txt;
                var iconFive = data.list[36].weather[0].icon;
                var iconUrlFive = "http://openweathermap.org/img/w/" + iconFive + ".png";
                var dateFive = dateFive.substr(0, 10);
                var tempFive = "Temp: " + data.list[36].main.temp + " &#8457;";
                var humidityFive = "Humidity: " + data.list[36].main.humidity + "%";
                // Append Day 5 Info to Day 5 Div
                $("#dateFive").append(dateFive);
                $("#iconFive").attr('src', iconUrlFive);
                $("#tempFive").append(tempFive);
                $("#humidFive").append(humidityFive);
            }
        })
    }
})

