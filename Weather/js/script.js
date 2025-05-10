const apiKey = "99f7ace6af2bf0fc805a94dc50bc6137"; // replace with your API key

function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("city-name").textContent = data.name;
      document.getElementById("temp").textContent = `Temperature: ${data.main.temp} °F`;
      document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
      document.getElementById("weather-result").classList.remove("hidden");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}
