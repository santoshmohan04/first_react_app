import * as weatheractions from './vatavaranType';

const initialState = {
    data: null,
    dailyData: null,
    cities: [],
    loading: false,
    error: '',
}

const weatherreducer = (state = initialState, action) => {
    switch (action.type) {
        case weatheractions.Weather_Page_Load_Data:
            return { ...state, loading: true, error: '', dailyData: null }
        case weatheractions.Weather_Page_Load_Data_Success:
            let citiesList = [
                action.payload.cityname,
                ...state.cities.filter((city) => city.toLowerCase() !== action.payload.cityname.toLowerCase()),
            ];
            if (citiesList.length > 8) citiesList = citiesList.slice(0, 8);
            return {
                ...state,
                cities: citiesList,
                data: action.payload.resdata,
                loading: false,
                dailyData: null,
            };
        case weatheractions.Weather_Page_Load_Data_Failure:
            return {
                ...state,
                data: null,
                loading: false,
                error: action.payload,
                dailyData: null,
            }
        case weatheractions.Weather_Page_Load_Daily_Data:
            return {
                ...state, loading: true, error: '', dailyData: null
            }
        case weatheractions.Weather_Page_Load_Daily_Data_Success:
            return {
                ...state,
                loading: false,
                dailyData: action.payload,
            }
        case weatheractions.Weather_Page_Load_Daily_Data_Failure:
            return {
                ...state,
                data: null,
                loading: false,
                error: action.payload,
                dailyData: null,
            }

        case weatheractions.Weather_Page_Delete_City:
            return {
                ...state,
                cities: state.cities.filter((city) => city !== action.payload),
            }
        case weatheractions.Weather_Page_Clear_All_Cities:
            return { ...state, cities: [], data:null, dailyData: null, error: '', loading: false }
        default: return state
    }
}

export default weatherreducer