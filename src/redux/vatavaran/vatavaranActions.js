import axios from 'axios'
import * as weatheractions from './vatavaranType';
const apiKey = process.env.REACT_APP_Weather_API_KEY;
const baseUrl = process.env.REACT_APP_Weather_API;


export const fetchCityWeatherData = (data) => {
  const cityweatherurl = baseUrl + `weather?q=${data}&units=metric&appid=${apiKey}`;
  return (dispatch) => {
    dispatch(loadCityWeatherData())
    axios
      .get(cityweatherurl)
      .then(response => {
        // response.data is the users
        const resdata = response.data;
        const cityname = response.data.name;
        if (resdata.cod === "404" && resdata.message === "city not found") {
          dispatch(loadCityWeatherDataFailure(response.data.message))
        } else {
          dispatch(loadCityWeatherDataSuccess({ resdata, cityname }));
        }
      })
      .catch(error => {
        console.log(error);
        // error.message is the error message
        dispatch(loadCityWeatherDataFailure(error.response.data.errore))
      })
  }
}

export const fetchCityGeoLocationData = ({lat, lon}) => {
  const cityweatherurl = baseUrl + `onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;
  return (dispatch) => {
    dispatch(loadDailyWeatherData({lat, lon}))
    axios
      .get(cityweatherurl)
      .then(response => {
        // response.data is the users
        dispatch(loadDailyWeatherDataSuccess(response.data))
      })
      .catch(error => {
        console.log(error);
        // error.message is the error message
        dispatch(loadDailyWeatherDataFailure(error.response.data.errore))
      })
  }
}

export const loadCityWeatherData = (data) => {
  return {
    type: weatheractions.Weather_Page_Load_Data,
    payload:data
  }
}

export const loadCityWeatherDataSuccess = ({resdata, cityname}) => {
  return {
    type: weatheractions.Weather_Page_Load_Data_Success,
    payload:{resdata, cityname}
  }
}

export const loadCityWeatherDataFailure = (error) => {
  return {
    type: weatheractions.Weather_Page_Load_Data_Failure,
    payload: error
  }
}

export const loadDailyWeatherData = ({lat, lon}) => {
  return {
    type: weatheractions.Weather_Page_Load_Daily_Data,
    payload: {lat, lon}
  }
}

export const loadDailyWeatherDataSuccess = (dailyData) => {
  return {
    type: weatheractions.Weather_Page_Load_Daily_Data_Success,
    payload: dailyData
  }
} 

export const loadDailyWeatherDataFailure = (error) => {
  return {
    type: weatheractions.Weather_Page_Load_Daily_Data_Failure,
    payload: error
  }
}

export const deleteCity = (data) => {
  return {
    type: weatheractions.Weather_Page_Delete_City,
    payload: data
  }
}

export const clearAllCities = () => {
  return {
    type: weatheractions.Weather_Page_Clear_All_Cities,
  }
}