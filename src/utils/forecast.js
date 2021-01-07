const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://dark-sky.p.rapidapi.com/${latitude},${longitude}`;
  request(
    {
      url,
      json: true,
      headers: {
        "x-rapidapi-key": "76eb599484msh2988e4fc789a432p1eb704jsn53d8a021a602",
        "x-rapidapi-host": "dark-sky.p.rapidapi.com",
        useQueryString: true,
      },
      qs: { lang: "en", units: "si" },
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to the weather services");
      } else if (body.error) {
        callback("Unable to find location");
      } else {
        const { temperature, precipProbability } = body.currently;
        const { summary } = body.daily.data[0];

        callback(
          undefined,
          `${summary} It is currently ${temperature} degress outside .There is a ${precipProbability}% chance of rain`
        );
      }
    }
  );
};
module.exports = forecast;
