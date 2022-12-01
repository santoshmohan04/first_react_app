import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/#">
            Counter App{" "}
            <span className="badge rounded-pill bg-secondary">
              {this.props.totalCounters}
            </span>
          </a>
          <a className="nav-link" href="/temp1">
            Products List
          </a>
          <a className="nav-link" href="/weather">
            Weather App
          </a>
          <a className="nav-link" href="/vatavaran">
            Vatavaran
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
