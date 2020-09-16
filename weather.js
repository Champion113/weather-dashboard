$(document).ready(function () {
    //Button click function
    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        var city = $("#search-box").val().trim();
        console.log(city)
        searchWeather(city)
        //save local storage
        localStorage.setItem("search-box", "city");
        saveCity(city);
        $('#search-box').text("")
        //Render city list
        renderCity();
    })
    // //Function Date and Time using moments
    var currentHour = moment().hours();

    //current weather function
    function searchWeather(city) {
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3c1f6f3e3b8bfd05cfdeea3d9f624493&units=imperial"
        fetch(apiUrl).then(function (response) {
            return response.json().then(function (response) {
                console.log(response);
                // use jQuery to create dynamic content and then append to the page.
                var card = $("<div>").addClass("card");
                var cardBody = $("<div>").addClass("card-body");
                var cardTitle = $("<h1>").addClass("card-title").text(response.name)
                var currentTemp = $("<h1>").addClass("card-title").text("Current Temp: " + Math.round(response.main.temp))
                //var currentTemp = $("<h1>").addClass("card-title").text("UV Index " + Math.round(response.uvi))
                //var cardTitle = $("<h1>").addClass("card-title").text("Humidity " + (response.main.humidity))
                //var cardTitle = $("<h1>").addClass("card-title").text("Wind Speed " + Math.round(response.wind.speed))
                card.prepend("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'/>")
                $("#today").append(card.append(cardBody.append(cardTitle, currentTemp)))
                getForecast(response.coord.lat, response.coord.lon)
                 
            })
        })
    }
    //5 days forecast
    function getForecast(lat, lon) {
        var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3c1f6f3e3b8bfd05cfdeea3d9f624493&units=imperial`
        console.log("current hour", currentHour)
        fetch(apiUrl).then(function (response) {
            return response.json().then(function (response) {
                //for loop to show all 5 days 
                for (var i = 1; i < 6; i++) {

                    console.log(response.daily[i], "each day")
                    //forecast cards for 5 different days: date, temp, humidity, wind speed, uvi, icon
                    var card = $("<div>").addClass("card");
                    var cardTitle = $("<h1>").addClass("card-title").text("" + moment().add(i, 'days').format("dddd, MMMM Do YYYY"))
                    card.append(cardTitle)
                    //Temp Card
                    var cardTitle = $("<h1>").addClass("card-title").text("Temp: " + Math.round(response.daily[i].temp.day))
                    card.append(cardTitle)
                    //Humidity Card
                    var cardTitle = $("<h1>").addClass("card-title").text("Humidity " + Math.round(response.daily[i].humidity))
                    card.append(cardTitle)
                    //Wind Speed Card   
                    var cardTitle = $("<h1>").addClass("card-title").text("Wind Speed " + Math.round(response.daily[i].wind_speed))
                    card.append(cardTitle)
                    //UV Index Card   
                    var cardTitle = $("<h2>").addClass("card-title").text("UV Index " + Math.round(response.daily[i].uvi))
                    card.append(cardTitle)
                    //icon element
                    card.prepend("<img src='http://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png'/>")
                    $("#forecast").append(card)
                }
                
            })

        
        
    
        })}})
