const API_KEY = "da1b9ba721d0a1091bd2c3cf21c95701";
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temp = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      temp.innerText = `${Math.floor(data.main.temp)}℃`;
    });
}

function onGeoError() {
  alert("Unable to determine your location");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//
