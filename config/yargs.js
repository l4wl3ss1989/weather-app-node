const argv = require('yargs').options({
  dir: {
    alias: 'd',
    desc: 'City direction to obtain weather',
    demand: true
  }
}).argv;

module.exports = {
  argv
}