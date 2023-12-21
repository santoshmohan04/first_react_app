import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: null,
    country: null,
    alert: null,
  });

  const APIKEY = "d4594364698122bfd1c4b3eb5f2ff19f";
  async function weatherData(e) {
    e.preventDefault();
    if (!form.city) {
      setForm({ ...form, alert: "Add City" });
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (data) => {
            return data;
          },
          (err) => {
            console.log(err);
          }
        );
      if (data.cod === "404" && data.message === "city not found") {
        setForm({ ...form, alert: data.message });
      } else {
        setWeather({ data: data });
        setForm({ ...form, alert: null });
      }
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
    if (name === "country") {
      setForm({ ...form, country: value });
    }
  };
  return (
    <div className="weather">
      <span className="title">Weather App</span>
      {form.alert ? <p className="text-danger">{form.alert}</p> : null}
      <form>
        <input
          type="text"
          placeholder="city"
          name="city"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
