const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
  const city = req.body.city;
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const weather = response.data;
    const weatherText = `It's ${weather.main.temp}°C in ${weather.name} with ${weather.weather[0].description}.`;
    res.render("index", { weather: weatherText, error: null });
  } catch (error) {
    res.render("index", { weather: null, error: "City not found." });
  }
});

app.listen(3000, () => {
  console.log("🌤️ Weather App running at http://localhost:3000");
});
