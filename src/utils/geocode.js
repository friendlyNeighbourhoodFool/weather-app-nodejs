const request = require('request')

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoiYW5raXQxMDg5IiwiYSI6ImNsMGdhMDhtZzA5aHgzam1zYmtqNTFjNzAifQ.wIh12iWZS8ZoVfONeU0CkA&limit=1";
    request({ url, json: true }, (error, {body}) => {
      if (error) {
        callback("Unable to connect to service!", undefined);
      } else if (body.message) {
        callback("Unable to find location.", undefined);
      } else {
          callback(undefined, {
              latitude: body.features[0].center[1],
              longitude: body.features[0].center[0],
              location: body.features[0].place_name
          })
      }
    });
  };

  module.exports = geocode