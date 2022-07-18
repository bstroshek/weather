

function getWeather() {

    var searchInput = document.getElementById("getCity");
    var topBlock = document.getElementById("js_top");
    var bottomBlock = document.getElementById("js_bottom");
    var errorBlock = document.getElementById("js_error");
    var inpCity = searchInput.value;

    let request;
    let requestHourly;

    if(window.XMLHttpRequest){
        request = new XMLHttpRequest();
        requestHourly = new XMLHttpRequest();

    }
    else{
        request = new ActiveXObject("Microsoft.XMLHTTP");
        requestHourly = new ActiveXObject("Microsoft.XMLHTTP");
    }


    request.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + inpCity + "&units=metric&lang=en&appid=5310a5ed72e96a1458bfcdf1a5cc7ad1");
    request.onload = function(){
        if(request.status === 200){
            topBlock.style.display = 'block'
            bottomBlock.style.display = 'block'
            errorBlock.style.display = 'none'
            let weatherObj = JSON.parse(request.response)
            console.log(weatherObj);
            searchInput.value = '';
            today = new Date;
            js_today.innerText = String(today.getDate()).padStart(2, '0') + '.' + String(today.getMonth() + 1).padStart(2, '0') + '.' + today.getFullYear();
            city_name.innerText = weatherObj.name
            tempId.innerText = weatherObj.main.temp
            tempMin.innerText = weatherObj.main.temp_min
            tempMax.innerText = weatherObj.main.temp_max
            windSpeed.innerText = weatherObj.wind.speed
            description.innerText = weatherObj.weather[0].description
            imagePath = "https://openweathermap.org/img/wn/" + weatherObj.weather[0].icon +"@2x.png"
            weatherImg.src = imagePath
        } else if (request.status === 404) {
            errorBlock.style.display = 'block'
            topBlock.style.display = 'none'
            bottomBlock.style.display = 'none'
        }
    }
    request.send();


    // HOURLY

    requestHourly.open("GET", "https://api.openweathermap.org/data/2.5/forecast?q=" + inpCity + "&units=metric&appid=5310a5ed72e96a1458bfcdf1a5cc7ad1");
    requestHourly.onload = function(){
        if(requestHourly.status === 200){
            let hourlyObj = JSON.parse(requestHourly.response)
            console.log(hourlyObj);
            let getTime1 = hourlyObj.list[0].dt_txt
            time1.innerText = getTime1.slice(11, 16)

            let getTime2 = hourlyObj.list[1].dt_txt
            time2.innerText = getTime2.slice(11, 16)

            let getTime3 = hourlyObj.list[2].dt_txt
            time3.innerText = getTime3.slice(11, 16)

            let getTime4 = hourlyObj.list[3].dt_txt
            time4.innerText = getTime4.slice(11, 16)

            let getTime5 = hourlyObj.list[4].dt_txt
            time5.innerText = getTime5.slice(11, 16)

            let getTime6 = hourlyObj.list[5].dt_txt
            time6.innerText = getTime6.slice(11, 16)

            // icons
            icon1.src = "https://openweathermap.org/img/wn/" + hourlyObj.list[0].weather[0].icon +"@2x.png"
            icon2.src = "https://openweathermap.org/img/wn/" + hourlyObj.list[1].weather[0].icon +"@2x.png"
            icon3.src = "https://openweathermap.org/img/wn/" + hourlyObj.list[2].weather[0].icon +"@2x.png"
            icon4.src = "https://openweathermap.org/img/wn/" + hourlyObj.list[3].weather[0].icon +"@2x.png"
            icon5.src = "https://openweathermap.org/img/wn/" + hourlyObj.list[4].weather[0].icon +"@2x.png"
            icon6.src = "https://openweathermap.org/img/wn/" + hourlyObj.list[5].weather[0].icon +"@2x.png"

            // description
            descr1.innerText = hourlyObj.list[0].weather[0].description
            descr2.innerText = hourlyObj.list[1].weather[0].description
            descr3.innerText = hourlyObj.list[2].weather[0].description
            descr4.innerText = hourlyObj.list[3].weather[0].description
            descr5.innerText = hourlyObj.list[4].weather[0].description
            descr6.innerText = hourlyObj.list[5].weather[0].description

            // temp
            temp1.innerText = hourlyObj.list[0].main.temp
            temp2.innerText = hourlyObj.list[1].main.temp
            temp3.innerText = hourlyObj.list[2].main.temp
            temp4.innerText = hourlyObj.list[3].main.temp
            temp5.innerText = hourlyObj.list[4].main.temp
            temp6.innerText = hourlyObj.list[5].main.temp

            // wind
            wind1.innerText = hourlyObj.list[0].wind.speed
            wind2.innerText = hourlyObj.list[0].wind.speed
            wind3.innerText = hourlyObj.list[0].wind.speed
            wind4.innerText = hourlyObj.list[0].wind.speed
            wind5.innerText = hourlyObj.list[0].wind.speed
            wind6.innerText = hourlyObj.list[0].wind.speed
        } else if (requestHourly.status === 404) {
            bottomBlock.style.display = 'none'
        }
    }
    requestHourly.send();
}

var searchInput = document.getElementById("getCity");
var inpCity = searchInput.value;

document.body.onkeydown = function (event) {
    if(event.code === "Enter" && searchInput.value !== '') {
        getWeather()
    }
}
