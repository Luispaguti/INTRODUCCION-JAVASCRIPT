let container = document.getElementById("container");
let searchForm = document.getElementById("search__submit");
let searchInput = document.getElementById("search__input");
let temperatureDegrees = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("weatherIcon");
let temperatureDescription = document.getElementById("description");
let timeZone = document.getElementById("timezone");
let date = document.getElementById("date");
let min = document.getElementById("min");
let max = document.getElementById("max");


const displayBackgroundImage = (obj)=>{
    let dateSpanish = new Date(obj.list[2].dt*1000).toLocaleString("es-ES", {
        timeStyle:"short",
        dateStyle:"long"
    });
    console.log(dateSpanish)

    date.textContent = `Actualización ${dateSpanish}`

    const dayHour = new Date(obj.list[2].dt*1000).getHours();
    console.log(dayHour);

    if(dayHour >6 && dayHour < 18){
        container.classList.remove("night");
        container.classList.add("day")
    }else{
        container.classList.remove("day");
        container.classList.add("night")
    }
}


const displayData=(obj)=>{
    temperatureDegrees.textContent = Math.floor(obj.list[0].main.temp);
    console.log(obj)
    timeZone.textContent = obj.list[0].name;
    min.textContent = Math.floor(obj.list[0].main.temp_min);
    max.textContent = Math.floor(obj.list[0].main.temp_max);
    temperatureDescription.textContent = obj.list[0].weather[0].description.charAt(0).toUpperCase()+obj.list[0].weather[0].description.slice(1);


}

const getWeatherData = async (city)=>{
    const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${city}&units=metric&lang=sp`, {
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "be6ca72279msh21901a33332576bp1cf9abjsn47aec49a9b0d"
        }
    });

    const data = await res.json();


    displayBackgroundImage(data);
    displayData(data);


}

searchForm.addEventListener("submit", e=>{
    e.preventDefault();
    getWeatherData(searchInput.value)
})



window.onload = ()=>{
    getWeatherData("Cádiz");
}