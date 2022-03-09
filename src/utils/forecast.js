const request = require("request");

const forecast = (lat, lon, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=34b06b558795c46e42847304c91b4ade&units=metric";
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to service.",undefined);
    } else if (body.cod) {
      callback("Unable to find location.",undefined);
    } else {
      callback(undefined,body.current.temp);
    }
  });
};

module.exports = forecast;
