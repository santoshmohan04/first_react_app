import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";

class Routes extends Component {
  render() {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="temp1" element={<Template1 />} />
          <Route path="counter" element={<Counter />} />
        </Routes>
      </React.Fragment>
    );
  }
}

export default Routes;
