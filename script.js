$(document).ready(function(){

    // Empty array for User Cities to go into
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

    function cityInfo() {
        var city = $("#userInput").val();

        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=666d531c4f692dda2c8468cb9e366c40',
            method: "GET",
            dataType: "jsonp",
            success: function(data){
                $("#cityInfo").empty();
                var h1El = $("<h1>");
                h1El.text(city);
                $("#cityInfo").append(h1El);
            }
        })
    }
})

