import React from "react";
import "./displayweather.css";

function DisplayWeather(props) {
  const { weatherdtls } = props;
  const iconurl =
  process.env.REACT_APP_Weather_Icon_Url +
    `${weatherdtls.cod !== 404 ? weatherdtls.weather[0].icon : null}@4x` +
    ".png";
  return (
    <div className="displayweather">
      {weatherdtls.cod !== 404 ? (
        <React.Fragment>
          <div className="maincard">
            <span className="cardtitle">
              {weatherdtls.name} , {weatherdtls.sys.country} Weather
            </span>
            <span className="cardsubtitle">
              As of {new Date().toLocaleTimeString()}
            </span>

            <h1>
              {" "}
              {Math.floor(weatherdtls.main.temp)}
              <sup>o</sup>
            </h1>
            <span className="weather-main">{weatherdtls.weather[0].main}</span>
            <img className="weather-icon" src={iconurl} alt="weather-icon" />
            <span className="weather-description">
              {" "}
              {weatherdtls.weather[0].description}
            </span>
          </div>
          <div className="weatherdetails">
            <div className="section1">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h4>High/Low</h4>
                    </td>
                    <td>
                      <span>
                        {Math.floor(weatherdtls.main.temp_max)}/
                        {Math.floor(weatherdtls.main.temp_min)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>Humidity</h4>
                    </td>
                    <td>
                      <span>{weatherdtls.main.humidity} %</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>Pressure</h4>
                    </td>
                    <td>
                      <span>{weatherdtls.main.pressure} hPa</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>Visibility</h4>
                    </td>
                    <td>
                      <span>{weatherdtls.visibility / 1000} Km</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section2">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h4>Wind</h4>
                    </td>
                    <td>
                      <span>
                        {Math.floor((weatherdtls.wind.speed * 18) / 5)} km/hr
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>Wind Direction</h4>
                    </td>
                    <td>
                      <span>
                        {weatherdtls.wind.deg}
                        <sup>o</sup> deg
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>Sunrise</h4>
                    </td>
                    <td>
                      <span>
                        {new Date(weatherdtls.sys.sunrise * 1000).toLocaleTimeString()}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>Sunset</h4>
                    </td>
                    <td>
                      <span>
                        {new Date(weatherdtls.sys.sunset * 1000).toLocaleTimeString()}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="maincard">
          <h2>{weatherdtls.message}</h2>
        </div>
      )}
    </div>
  );
}

export default DisplayWeather;
