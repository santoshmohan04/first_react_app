import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityWeatherData, clearAllCities, fetchCityGeoLocationData, deleteCity } from "../redux";
import "./vatavaran.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import CityForecast from "./cityforecast";

function Vatavaran() {
  const weatherdtls = useSelector(state => state.vatavaran.data);
  const cities = useSelector(state => state.vatavaran.cities);
  const errMsg = useSelector(state => state.vatavaran.error);
  const dispatch = useDispatch();
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(true);
  const [form, setForm] = useState({
    city: '',
  });
  const [alertMsg, setAlertMsg] = useState('');
  

  // This function will called only once
  useEffect(() => {
    if(weatherdtls){
      console.log("weatherdtls >>> ", weatherdtls);
      dispatch(fetchCityGeoLocationData({lat:weatherdtls.coord.lat , lon:weatherdtls.coord.lon}));
    }
    if (errMsg !== '') {
      setAlertMsg(errMsg);
      toggleShowA();
    }
  }, [weatherdtls, dispatch, errMsg]);

  function getCityWeather(e) {
    e.preventDefault();
    if (!form.city) {
      setAlertMsg("Enter City");
      toggleShowA();
    } else {
      dispatch(fetchCityWeatherData(form.city));
      setForm({ ...form, city: '' })
    }
  }

  const clearCities = (e) => {
    e.preventDefault();
    dispatch(clearAllCities());
  };

  const removeCity = (data, e) => {
    e.preventDefault();
    dispatch(deleteCity(data));
  };

  const List_city = cities.map((t) => (
    <ul key={t}>
      <li>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            {t}
          </div>
          <div>
            <span
              className="pointer"
              onClick={() => dispatch(fetchCityWeatherData(t))}
            >
              <i className="bi bi-arrow-repeat"></i>
            </span>
            <span
              className="pointer pl-10"
              onClick={(e) => removeCity(t, e)}
            >
              <i className="bi bi-trash text-danger"></i>
            </span>
          </div>
        </div>
        <hr />
      </li>
    </ul>
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
        <h2 className="text-success">Vatavaran</h2>
        <div className="row">
          <div className="col-4" id="cities">
            <form onSubmit={(e) => getCityWeather(e)}>
              <div className="input-group">
                <input
                  type="text"
                  required
                  name="city"
                  className="form-control"
                  value={form.city}
                  placeholder="Type City Name"
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                <button className="btn btn-primary" type="submit" disabled={form.city === ''}>
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            </form>
            {cities.length > 0 && (
              <>
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
              </>
            )
            }
          </div>
          <div className="col-8" id="city-weather">
            <CityForecast/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Vatavaran;
