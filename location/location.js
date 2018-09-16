const axios = require('axios');

const getLocation = async (adress) => {

  let encodeUrl = encodeURI(adress); //adress "Madrid Spain"
  let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ encodeUrl }&key=AIzaSyANmZi4YBYleh6A2tXBWOLBECZuami8j8o`);
    
  if ( response.data.status === 'ZERO_RESULTS' ) {
    throw new Error(`No results for dir: ${ adress }`);
  }

  let data = response.data.results[0];
  let location = {
    adress: data.formatted_address,
    lat: data.geometry.location.lat,
    lng: data.geometry.location.lng
  };

  // return JSON.stringify(response.data.results, undefined, 2);
  return location;

}

module.exports = {
  getLocation
}
