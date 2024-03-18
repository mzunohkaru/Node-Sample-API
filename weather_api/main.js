const request = require("request");
const dotenv = require("dotenv").config();

const argument = process.argv[2];

const TEMP = "units=metric";

const options = {
  url: `https://api.openweathermap.org/data/2.5/weather?q=${argument}&${TEMP}&APPID=${process.env.API_KEY}`,
  method: "GET",
  json: true,
};

request(options, (error, res, body) => {
  if (error) {
    console.log(error);
  } else {
    console.log(body);
    console.log(`現在の${argument}の気温は、${body.main.temp}度です`);
  }
});
