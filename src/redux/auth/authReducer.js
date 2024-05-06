import * as authactions from './authType';

const initialState = {
    loading: false,
    loggedInUserDetails: localStorage.getItem("authdata")
    ? JSON.parse(localStorage.getItem("authdata"))
    : null,
    error: null
  }
  
  const authreducer = (state = initialState, action) => {
    switch (action.type) {
      case authactions.LOGIN_USER_REQUEST:
        return {
          ...state,
          loading: true
        }
      case authactions.LOGIN_USER_SUCCESS:
        return {
          loading: false,
          loggedInUserDetails: action.payload,
          error: null
        }
      case authactions.LOGIN_USER_FAILURE:
        return {
          loading: false,
          loggedInUserDetails:localStorage.getItem("authdata")
          ? JSON.parse(localStorage.getItem("authdata"))
          : null,
          error: action.payload
        }
        case authactions.SIGNUP_USER_REQUEST:
        return {
          ...state,
          loading: true
        }
      case authactions.SIGNUP_USER_SUCCESS:
        return {
          loading: false,
          loggedInUserDetails: action.payload,
          error: null
        }
      case authactions.SIGNUP_USER_FAILURE:
        return {
          loading: false,
          loggedInUserDetails:localStorage.getItem("authdata")
          ? JSON.parse(localStorage.getItem("authdata"))
          : null,
          error: action.payload
        }
        case authactions.LOGOUT_USER_REQUEST:
        return {
          loading: false,
          loggedInUserDetails:null,
          error: null
        }
      default: return state
    }
  }
  
  export default authreducer
