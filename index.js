const request = require('request');

module.exports = class Botuber {
  constructor (longitudestart, latitudestart, longitudeend, latitudeend) {
    this.longitudestart = longitudestart;
    this.latitudestart = latitudestart;
    this.longitudeend = longitudeend;
    this.latitudeend = latitudeend;
  }

  /**
   * Initialize
   * @return {Error | string} result
   */
  init (callback) {
    const options = {
      method: 'GET',
      url: 'https://api.uber.com/v1.2/estimates/price',
      qs: {
        start_latitude: this.latitudestart,
        start_longitude: this.longitudestart,
        end_latitude: this.latitudeend,
        end_longitude: this.longitudeend 
      },
      headers:{
        'Authorization': 'Token ' + 'GiXTv8BW2O-18gX4iNfVmzEkNm1Khmxo-ALAhVGH',
        'Accept-Language': 'en_US',
        'Content-Type':  'application/json'
      } 
    };

    request(options, function requeste (error, response, body) {
      if (error) {
        return console.error('Failed: %s', error.message);
      }
      callback(body);
      return body;
    });
  }
  /**
   * Run
   * @return {Error | string} result
   */
  run () {
    var sync = true;

    this.init(result => {
      //console.log(result);
      this.setJson(result);
      sync = false;
    });
    while (sync) {
      require('deasync').sleep(100);
    }
  }

  setJson (json) {
    this.json = JSON.parse(json);
  }

  getJson () {
    return this.json;
  }
  getDistance (i) {
    return this.json.prices[i].distance;
  }
  getPriceEstimate (i) {
    return this.json.prices[i].estimate;
  }
  getName (i) {
    return this.json.prices[i].display_name;
  }
};


