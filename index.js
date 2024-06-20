//Weather APP

//get const
const weather = document.querySelector(".weatherform");// returns the first elemnt with this class
const input = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apiKey = "1aa37020a6ea85ff37d20be24f360b6d";

weather.addEventListener('submit',  async event => {
    event.preventDefault();    //prevent the default behavouir of a form

   
    const city = input.value;
    if(city){
        try{
               const weatherData = await getWeatherData(city);
               displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);

        }


    }
    else{
        displayError("please fill in a city");
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const respone = await fetch(apiUrl);
    console.log(respone);
    if(!respone){
        throw new Error("could not fetch weather data");
    }


    return  await respone.json();

}
function displayWeatherInfo(data){
    
    //object destruct ing
    const {name:city,main:{temp,humidity},weather:[{description,id}]} = data ;  //data is a object
      card.textContent = "";
      card.style.display = "flex";


      const cityDisplay = document.createElement("h1");
      const tempDisplay = document.createElement("p");
      const humidityDisplay = document.createElement("p");
      const descDisplay = document.createElement("p");
      const weatherEmoji = document.createElement("p");
      
     cityDisplay.textContent = city;
     tempDisplay.textContent = `${temp.toFixed(1)}k`
     humidityDisplay.textContent = `Huimdity: ${humidity}`;
     descDisplay.textContent = description;
     weatherEmoji.textContent = getWeatherEmoji(id); 

     cityDisplay.classList.add(`citydisplay`);
     tempDisplay.classList.add(`tempdisplay`);
     humidityDisplay.classList.add("humiditydisplay");
     descDisplay.classList.add("descdisplay");
     weatherEmoji.classList.add("weatheremoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weather){

    switch(true){
        case (weather>= 200 && weather< 300):
            return `⛈️`;
            
        case (weather>= 300 && weather< 400):
             return `🌦️`;
       case (weather>= 400 && weather< 500):
             return `🌧️`;
      case (weather>= 500 && weather< 600):
             return `🌧️`;
      case (weather>= 600 && weather< 700):
             return `🌨️`;
     case (weather>= 700 && weather< 800):
             return `🌫️`;
      case (weather === 800):
                return `☀️`;
     case (weather>= 801 && weather< 810):
              return `🌥️`;
      default:
        return "❓"
    }

}

function displayError(error){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = error;
    errorDisplay.classList.add("errordisplay");
    card.textContent = " ";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}
