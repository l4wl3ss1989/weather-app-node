const axios = require('axios');

const getWeather = async (lat, lng) => {

  let encodeUrlLat = encodeURI(lat);
  let encodeUrlLng = encodeURI(lng);

  let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ encodeUrlLat }&lon=${ encodeUrlLng }&units=metric&appid=b082eeb33cc66669534b4c26777e814f`);
  let data = response.data;

  //return response.data.main.temp;
  return {
    temp: data.main.temp,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    desc: data.weather.description,
    windspeed: data.wind.speed
  }
}

module.exports = {
  getWeather
}