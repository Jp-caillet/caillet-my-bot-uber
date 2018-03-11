const request = require('request');

class Botuber {
  constructor (longitude, latitude) {
    this.longitude = longitude;
    this.latitude = latitude;
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
        start_latitude: this.latitude,
        start_longitude: this.longitude,
        end_latitude: '48.8584',
        end_longitude: '2.2945'
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

const test = new Botuber(2.3823087999999997,48.896551699999996);
test.run();
console.log(test.getName (0));

