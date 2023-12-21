import React, { useEffect, useState } from "react";
import "./vatavaran.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function Vatavaran() {
  const [query, setQuery] = useState(null);
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(true);
  const [weather, setWeatherData] = useState([]);
  const [form, setForm] = useState({
    city: null,
  });
  const [alertMsg, setAlertMsg] = useState([]);
  let [cityData, setCityWeather] = useState([]);
  let [cityName, setCityName] = useState(null);
  const APIKEY = "d4594364698122bfd1c4b3eb5f2ff19f";
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDate = (item) => {
    if (item) {
      const d = new Date(item * 1000);
      let day = weekday[d.getDay()];
      let day_number = d.getDate();
      return day.substring(0, 3) + " " + day_number;
    }
  };

  // This function will called only once
  useEffect(() => {});
  async function getGeoLoc(e) {
    e.preventDefault();
    if (!form.city) {
      setAlertMsg("Enter City");
      toggleShowA();
    } else {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&units=metric&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (data) => {
            if (data.cod !== "404") {
              setCityWeather((prevArray) => [...prevArray, data]);
              getCityWeather(data.name, data.coord.lat, data.coord.lon, e);
              e.target.reset();
            } else {
              setAlertMsg(data.message);
              toggleShowA();
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
  async function getCityWeather(city, latitude, longitude, e) {
    e.preventDefault();
    if (city) {
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (data) => {
            if (data.cod !== "404") {
              setCityName(city);
              setWeatherData(data);
            } else {
              setAlertMsg(data.message);
              toggleShowA();
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
  };

  const clearCities = (e) => {
    e.preventDefault();
    setCityWeather([]);
    setWeatherData([]);
  };

  const removeCity = (city_name, e) => {
    e.preventDefault();
    cityData = cityData.filter((t) => t.name !== city_name);
    cityName = null;
    setCityName(cityName);
    setCityWeather(cityData);
    setWeatherData([]);
    if (cityData.length > 0) {
      getCityWeather(
        cityData[0].name,
        cityData[0].coord.lat,
        cityData[0].coord.lon,
        e
      );
    }
  };

  const List_city = cityData
    .filter((post) => {
      if (!query || post.name.toLowerCase().includes(query.toLowerCase())) {
        return post;
      } else {
        return null;
      }
    })
    .map((t) => (
      <ul key={t.id}>
        <li>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              {t.name} - {t.main.temp}
              <sup>o</sup>C {t.weather.main}
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  `${t.cod !== 404 ? t.weather[0].icon : null}` +
                  ".png"
                }
                alt={t.weather[0].main}
                width="50"
                height="50"
              />
            </div>
            <div>
              <span
                className="pointer"
                onClick={(e) =>
                  getCityWeather(t.name, t.coord.lat, t.coord.lon, e)
                }
              >
                <i className="bi bi-arrow-repeat"></i>
              </span>
              <span
                className="pointer pl-10"
                onClick={(e) => removeCity(t.name, e)}
              >
                <i className="bi bi-trash text-danger"></i>
              </span>
            </div>
          </div>
          <hr />
        </li>
      </ul>
    ));

  const daily_weather = weather.daily?.map((t) => (
    <div className="col" style={{ display: "inline-block" }} key={t.sunrise}>
      {handleDate(t.dt)}
      <img
        src={
          "http://openweathermap.org/img/wn/" +
          `${t.weather[0].icon}` +
          "@4x.png"
        }
        alt={t.weather[0].description}
        width="80"
        height="80"
      />
      {t.temp.max} <sup>o</sup>C
    </div>
  ));

  return (
    <React.Fragment>
      <ToastContainer className="p-3" position="top-end">
        <Toast
          show={showA}
          bg="danger"
          onClose={() => setShowA(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Warning!</strong>
          </Toast.Header>
          <Toast.Body>{alertMsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="container-fluid mt-3">
        <h2 className="text-success">Weather App</h2>
        <div className="row">
          <div className="col-4" id="cities">
            <form onSubmit={(e) => getGeoLoc(e)}>
              <div className="input-group">
                <input
                  type="text"
                  required
                  name="city"
                  className="form-control"
                  placeholder="Type City Name"
                  onChange={(e) => handleChange(e)}
                />
                <button className="btn btn-primary" type="submit">
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            </form>
            <hr />
            <input
              type="search"
              className="form-control"
              placeholder="Recent Locations"
              onChange={(event) => setQuery(event.target.value)}
            />
            <hr />
            {List_city}
            <button
              type="button"
              className="btn btn-secondary m-1"
              style={{ float: "right" }}
              onClick={(e) => clearCities(e)}
            >
              Clear
            </button>
          </div>
          <div className="col-8" id="city-weather">
            {Object.keys(weather).length > 0 && (
              <React.Fragment>
                <h3 className="text-primary">
                  {cityName}
                  <span
                    className="pointer"
                    style={{ float: "right" }}
                    onClick={(e) =>
                      getCityWeather(cityName, weather.lat, weather.lon, e)
                    }
                  >
                    <i className="bi bi-arrow-repeat"></i>
                  </span>
                </h3>
                <div className="row">
                  <div className="col">
                    <img
                      src={
                        "http://openweathermap.org/img/wn/" +
                        `${weather.current.weather[0].icon}` +
                        "@4x.png"
                      }
                      alt={weather.current.weather[0].description}
                      width="200"
                      height="200"
                    />
                  </div>
                  <div className="col">
                    <p>{weather.current.temp} C</p>
                    <p>{weather.current.weather[0].description}</p>
                    <p>
                      {weather.current.wind_speed}ms {weather.current.wind_deg}
                      deg
                    </p>
                    <p>{weather.current.pressure}</p>
                  </div>
                </div>
                <div className="row">{daily_weather}</div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Vatavaran;
