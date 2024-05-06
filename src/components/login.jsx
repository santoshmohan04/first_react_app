import React from "react";
import '../assets/css/auth.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from "../redux";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

function Login() {
  const [showPassword, setShowPassord] = React.useState(false);
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [pswd, setPswd] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [apierr, setApiErr] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logindtls = localStorage.getItem('usr') ? JSON.parse(localStorage.getItem('usr')) : null;

  // Select relevant state using useSelector
  const usrdtls = useSelector(state => state.auth.loggedInUserDetails);
  const errMsg = useSelector(state => state.auth.error);
  const isLoading = useSelector(state => state.auth.loading);

  // Effect to handle navigation after successful login or display error message
  React.useEffect(() => {
    if(logindtls) {
      setEmail(logindtls.user_email);
      setPswd(logindtls.user_pswd);
      setIsChecked(true);
    }
      if (usrdtls) {
          navigate('/');
      }
      if (errMsg) {
          setApiErr(errMsg);
          setShow(true);
      }
  }, [logindtls, usrdtls, errMsg, navigate]);

  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if(!event.target.checked){
      localStorage.removeItem("usr");
    }
  };


    const handleAuth = (e) => {
        e.preventDefault();
        if (validateEmail(email) && pswd !== '') {
            // Email is valid
            setIsValidEmail(true);
            // Proceed with form submission or other actions

            if (isChecked) {
                const payload = {
                  user_email: email,
                  user_pswd: pswd,
                };
                localStorage.setItem("usr", JSON.stringify(payload));
            } else {
              localStorage.removeItem("usr");
            }
            const loginpayload = {
                email: email,
                password: pswd,
                returnSecureToken: true,
              };
          
              dispatch(loginUser(loginpayload));
          } else if(!validateEmail(email)) {
            setIsValidEmail(false);
          } else {
            alert("Invalid email or password");
          }
    }

    return (
    <React.Fragment>
      {isLoading ? (<Spinner animation="border" variant="success" className="text-center" />) : (
    <div className="outer-box">
    {show && <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          {apierr}
        </Alert>}
    <div className="inner-box">
        <header className="signup-header">
        {isLoginPage && <h1>Login</h1> }
        {isSignupPage && (<><h1>Signup</h1>
        <p>It just takes 30 seconds</p></>)}
        </header>
        <main className="signup-body">
          <form onSubmit={handleAuth}>
          <div className="mb-3 mt-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter valid email"
              name="email"
            />
            {!isValidEmail && <p className="text-danger">Please enter a valid email address.</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="pwd">Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="pwd"
                value={pswd}
                onChange={(e) => setPswd(e.target.value)}
                placeholder="Enter password"
                name="pswd"
              />
              <span
                className="input-group-text"
                onClick={() => setShowPassord((showPassword) => showPassword = !showPassword)}
              >
                <em
                  id="changePassIcon"
                  className={!showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'}
                >
                </em>
              </span>
            </div>
          </div>
          <div className="form-check mb-3">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                name="remember"
               checked={isChecked}
               onChange={handleCheckboxChange}
              />
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-3"
          >
            Submit
          </button>
        </form>
    </main>
  
        <footer className="signup-footer">
        {isLoginPage && <p>Do not have an Account? <Link to="/signup">Signup</Link> </p> }
        {isSignupPage && <p>Already have an Account? <Link to="/login">Login</Link> </p> }
        </footer>
  
    </div>
    <div className="circle c1"></div>
    <div className="circle c2"></div>
    
  </div>)}
  </React.Fragment>);
}

export default Login;