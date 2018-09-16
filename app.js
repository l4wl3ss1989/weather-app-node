// const axios = require('axios');
const argv = require('./config/yargs').argv;
const location = require('./location/location'); 
const weather = require('./weather/weather'); 
var colors = require('colors/safe');

// const argv = require('yargs').options({
//   dir: {
//     alias: 'd',
//     desc: 'City direction to obtain weather',
//     demand: true
//   }
// }).argv;

let getWeatherInfo = async (dir) => {
  try{

    let coords = await location.getLocation(dir);
    let temperature = await weather.getWeather( coords.lat, coords.lng );

    //return `Weather in ${ coords.adress } is ${ weather } ºC`;
    return stringWeather(temperature, coords.adress);
    //return temperature;

  }catch (err){
    return `Could't find weather for dir: ${ dir }`;
  }

}

getWeatherInfo(argv.dir)
  .then( msg => console.log(msg) )
  .catch( err => console.log(err) )

let stringWeather = (weather, dir) =>{
  let response = '';
  response += colors.green('====================================\n');
  response += colors.green(`Wheater in ${ dir } \n`);
  response += colors.green('====================================\n');
  response += `Tempearature now: ${colors.cyan(weather.temp)} ºC\n`;
  response += `Maximum temperature today: ${colors.cyan(weather.temp_max)} ºC\n`;
  response += `Minimum temperature today: ${colors.cyan(weather.temp_min)} ºC\n`;
  if(weather.dec != undefined)
    response += `Wheather description: ${colors.cyan(weather.desc)}\n`;
  if(weather.pressure != undefined)
    response += `Pressure: ${colors.cyan(weather.pressure)}\n`;
  response += `Wind speed: ${colors.cyan(weather.windspeed)}\n`;
  response += colors.green('====================================\n');
  response += colors.green('====================================');

  return response;
}

// location.getLocation(argv.dir)
//   .then( response => {
//     console.log(response)
//   })
//   .catch( err => console.log(err));

// weather.getWeather(9.9280694, -84.0907246)
//   .then( temp => console.log(temp) )
//   .catch( err => console.log(err) );

//console.log(argv.dir);

// let encodeUrl = encodeURI(argv.dir); //adress "Madrid Spain"

// axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ encodeUrl }&key=AIzaSyANmZi4YBYleh6A2tXBWOLBECZuami8j8o`)
//   .then( response => {

//     let data = response.data.results[0];
//     let location = {
//       adress: data.formatted_address,
//       lat: data.geometry.location.lat,
//       lng: data.geometry.location.lng
//     };

//     console.log(location);
//     //console.log( JSON.stringify(response.data.results, undefined, 2) );
//     //console.log(response);
//   })
//   .catch( err => console.log('Error:', err) );