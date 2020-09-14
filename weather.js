$(document).ready(function() {
  
    $("#search-btn").on("click",function(event){
        event.preventDefault();
        var city = $("#search-box").val().trim();
        console.log(city)
        searchWeather(city)
    })


    function searchWeather(city) {
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3c1f6f3e3b8bfd05cfdeea3d9f624493&units=imperial"
        fetch(apiUrl).then(function (response) {
            return response.json().then(function(response) {
                console.log(response);
                // use jQuery to create dynamic content and then append to the page.
                var card = $("<div>").addClass("card"); 
                var cardBody = $("<div>").addClass("card-body"); 
                var cardTitle = $("<h1>").addClass("card-title").text(response.name)
                var currentTemp = $("<h1>").addClass("card-title").text("Current Temp: " + Math.round(response.main.temp))
                $("#today").append(card.append(cardBody.append(cardTitle, currentTemp)))
                getForecast(response.coord.lat, response.coord.lon)
            })
        })

    }

    function getForecast(lat, lon) {
        var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3c1f6f3e3b8bfd05cfdeea3d9f624493&units=imperial`
        fetch(apiUrl).then(function (response) {
            return response.json().then(function(response) {
                console.log(response);

                for(var i = 1; i < 6; i++) {
                    console.log(response.daily[i])
                    //create cards 
              
            }
        })    
    }

 
        





//         fetch(apiUrl)
//             .then(function (response) {
//                 // request was successful
//                 if (response.ok) {
//                     response.json().then(function (data) {
//                         // displayRepos(data, city);
//                     });
//                 } else {
//                     alert("Error: " + response.statusText);
//                 }
//             })

// //element of icon
//         var iconCode = data.weather[0].icon;
//         var weatherIcon = document.createElement("img");
//         tempContainerEl.innerHTML = '';
//         var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
//         weatherContainer.appendChild(weatherIcon);
//     })


// //element of weather temperture
//     var tempContainer = document.querySelector('#temp-container');
//     tempContainerEl.innerHTML = '';
//     var temp = document.createElement('temp');
//     weatherContainer.appendChild(weather);
    
// })

// //element of city name & date
// var tempContainer = document.querySelector('#temp-container');
// tempContainerEl.innerHTML = '';
// weatherContainer.appendChild(city);

// //element of humidity
// var tempContainer = document.querySelector('#temp-container');
// tempContainerEl.innerHTML = '';
// weatherContainer.appendChild(humidity);



// //element of wind speed
// var tempContainer = document.querySelector('#temp-container');
// tempContainerEl.innerHTML = '';
// weatherContainer.appendChild(wind);





    //element of uv index w/ click uv index show colors







    // var weatherEl = document.createElement("img");

    // imgEl.setAttribute("src",)



    // weatherContainer.appendChild(imgEl)
    //search button shows city history


        )}})
