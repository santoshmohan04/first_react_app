import React, { Component } from "react";
import "../App.css";
import logo from "../logo.svg";

class Main extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid p-5 bg-primary text-white text-center">
          <h1>My First Bootstrap Page</h1>
          <p>Resize this responsive page to see the effect!</p>
        </div>

        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello My name is Tamire Santhosh Mohan</p>
        <a
          className="btn btn-primary"
          href="https://reactjs.org"
          rel="noopener noreferrer"
          role="button"
          target="_blank"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Learn React
        </a>

        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-4">
              <h3>Basic Template 1</h3>
              <p>My First Bootstrap 5 Page</p>
              <a
                className="btn btn-primary"
                href="/temp1"
                rel="noopener noreferrer"
                role="button"
                target="_blank"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Try it Yourself
              </a>
            </div>
            <div className="col-sm-4">
              <h3>Basic Counter App</h3>
              <a
                className="btn btn-primary"
                href="/counter"
                rel="noopener noreferrer"
                role="button"
                target="_blank"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Try it Yourself
              </a>
            </div>
            <div className="col-sm-4">
              <h3>Column 3</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
