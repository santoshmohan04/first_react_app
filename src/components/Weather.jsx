import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityWeatherData, clearAllCities } from "../redux";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [form, setForm] = useState({
    city: '',
    country: '',
    alert: '',
  });
  const dispatch = useDispatch();
  const weatherdtls = useSelector(state => state.vatavaran.data);
  const errMsg = useSelector(state => state.vatavaran.error);

  React.useEffect(() => {
      if (errMsg !== '') {
        setForm({ ...form, alert: errMsg });
      }
  }, [errMsg, form]);


  function weatherData(e) {
    e.preventDefault();
    if (form.city === '') {
      setForm({ ...form, alert: "Add City" });
    } else {
      dispatch(clearAllCities());
      dispatch(fetchCityWeatherData(form.city));
    }
  }

  
  return (
    <div className="weather">
      <p className="title">Weather App</p>
      {form.alert ? <p className="text-danger">{form.alert}</p> : null}
      <form className="d-flex justify-content-center" onSubmit={(e) => weatherData(e)}>
        <input
          type="text"
          placeholder="city"
          name="city"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          name="country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />
        <button className="getweather" type="submit" disabled={form.city === '' || form.country === ''}>
          Submit
        </button>
      </form>

      {weatherdtls && (
        <div>
          <DisplayWeather weatherdtls={weatherdtls}/>
        </div>
      )}
    </div>
  );
}

export default Weather;
