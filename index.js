// api key 502b51018e437905f9f1bdc32cd8e4f1

const fetchWeather = (name) => {
  let apiKey = "502b51018e437905f9f1bdc32cd8e4f1",
      apiCall = "http://api.openweathermap.org/data/2.5/weather?q="+name+"&appid="+apiKey+"&lang=es&units=metric";

    axios.get(apiCall)
        .then(response => {
          // console.log(JSON.stringify(response.data, undefined, 4));
          let gradientContainer = document.getElementsByTagName("body")[0],
              descriptionResponse = response.data["weather"][0]["description"],
              tempResponse = Math.trunc(response.data["main"]["temp"]),
              countryResponse = response.data["sys"]["country"],
              cityResponse = response.data["name"];

          descriptionResponse = capitalizeFirstLetter(descriptionResponse);

          document.querySelector(".temp").textContent = tempResponse+"°";
          document.querySelector(".state").textContent = descriptionResponse;
          document.querySelector(".place").textContent = cityResponse +", "+countryResponse;

          gradientContainer.classList.remove('coldWeather', 'cooldWeather', 'warmWeather');
          if (tempResponse <= 15){gradientContainer.classList.add("coldWeather")};
          if (tempResponse > 15 && tempResponse < 28 ){gradientContainer.classList.add("cooldWeather")};
          if (tempResponse >= 28 ){gradientContainer.classList.add("warmWeather")};

        })
        .catch(error => console.error(error));
};

function submmitBut() {
  let namecity = document.querySelector("#nameInput").value;
  document.querySelector("#nameInput").value = "";
  
  if (namecity == ""){
    return;
  } else {
    fetchWeather(namecity);
  }
}

// Capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
