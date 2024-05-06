import axios from 'axios'
import * as authactions from './authType'
const apiKey = process.env.REACT_APP_Firebase_API_KEY;
const baseUrl = process.env.REACT_APP_Firebase_AUTH;
const signupurl = baseUrl + "accounts:signUp?key=" + apiKey;
const loginurl = baseUrl + "accounts:signInWithPassword?key=" + apiKey;

  export const loginUser = (payload) => {
    return (dispatch) => {
      dispatch(loginUserRequest())
      axios
        .post(loginurl, payload)
        .then(response => {
          // response.data is the users
          const user = response.data
          if(user.expiresIn){
            localStorage.setItem("authdata", JSON.stringify(user));
            dispatch(loginUserSuccess(user))
          }
          
        })
        .catch(error => {
          // error.message is the error message
          const errMsg = handleError(error)
          dispatch(loginUserFailure(errMsg.message))
        })
    }
  }

  export const signupUser = (payload) => {

    return (dispatch) => {
      dispatch(signupUserRequest())
      axios
        .post(signupurl, payload)
        .then(response => {
          // response.data is the users
          const user = response.data
          if(user.expiresIn){
            localStorage.setItem("authdata", JSON.stringify(user));
            dispatch(signupUserSuccess(user))
          }
          
        })
        .catch(error => {
          // error.message is the error message
          const errMsg = handleError(error)
          dispatch(signupUserFailure(errMsg.message))
        })
    }
  }
  
  export const loginUserRequest = () => {
    return {
      type: authactions.LOGIN_USER_REQUEST
    }
  }
  
  export const loginUserSuccess = user => {
    return {
      type: authactions.LOGIN_USER_SUCCESS,
      payload: user
    }
  }
  
  export const loginUserFailure = error => {
    return {
      type: authactions.LOGIN_USER_FAILURE,
      payload: error
    }
  }

  export const signupUserRequest = () => {
    return {
      type: authactions.SIGNUP_USER_REQUEST
    }
  }
  
  export const signupUserSuccess = user => {
    return {
      type: authactions.SIGNUP_USER_SUCCESS,
      payload: user
    }
  }
  
  export const signupUserFailure = error => {
    return {
      type: authactions.SIGNUP_USER_FAILURE,
      payload: error
    }
  }

  export const logoutUser = () => {
    localStorage.clear();
    return {
      type: authactions.LOGOUT_USER_REQUEST,
    }
  }

  const handleError = (errorRes) => {
    console.log("errorRes >>> ", errorRes);
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.response.data.error) {
        return { message: errorMessage };
    }
    switch (errorRes.response.data.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct.";
        break;
      default:
        errorMessage = "An unexpected error occurred.";
        break;
    }
    return { message: errorMessage };
  }
