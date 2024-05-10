import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityGeoLocationData } from "../redux";

function CityForecast(){
    const weatherdtls = useSelector(state => state.vatavaran.data);
    const dailydata = useSelector(state => state.vatavaran.dailyData);
    const dispatch = useDispatch();
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

      function getCityGeoLocationData(data) {
        dispatch(fetchCityGeoLocationData(data));
      }


    const daily_weather = dailydata?.daily.map((t) => (
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
            {dailydata && (
              <React.Fragment>
                <h3 className="text-primary">
                  {weatherdtls?.name}
                  <span
                    className="pointer"
                    style={{ float: "right" }}
                    onClick={(e) =>
                      getCityGeoLocationData(weatherdtls.coord, e)
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
                        `${dailydata.current.weather[0].icon}` +
                        "@4x.png"
                      }
                      alt={dailydata.current.weather[0].description}
                      width="200"
                      height="200"
                    />
                  </div>
                  <div className="col">
                    <p>{dailydata.current.temp} C</p>
                    <p>{dailydata.current.weather[0].description}</p>
                    <p>
                      {dailydata.current.wind_speed}ms {dailydata.current.wind_deg}
                      deg
                    </p>
                    <p>{dailydata.current.pressure}</p>
                  </div>
                </div>
                <div className="row">{daily_weather}</div>
              </React.Fragment>
            )}
            </React.Fragment>
    )
}

export default CityForecast;