// Empty array for User Cities to go into
var cities = [];

// Function that appends previous inputs into Div
function pastCity() {
    // Empties Div so no repeats occur
    $("#previousInputs").empty();
    for (var i = 0; i < cities.length; i++) {
        var cityHEl = $("<h6>");
        cityHEl.text(cities[i]);
        $("#previousInputs").append(cityHEl);
    }
}

// Event for city search submission
$("#submitBtn").on("click", function(event) {
    event.preventDefault();
    var userInput = $("#userInput").val().trim();
    cities.push(userInput);
    pastCity();
    $("#userInput").val("");
})
