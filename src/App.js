import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Route, Routes, Switch } from "react-router-dom";

import Counters from "./components/counters";
import Navbar from "./components/navbar";
import React, { Component } from "react";
import Weather from "./components/Weather";
import Shopping from "./components/shopping";
import Vatavaran from "./components/vatavaran";
import NerTagging from "./components/nertagging";
import NewsData from "./components/news";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 20 },
      { id: 3, value: 3 },
      { id: 4, value: 16 },
      { id: 5, value: 2 },
    ],
  };

  myStyles = {
    fontSize: 18,
    fontWeight: "bold",
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleAdd = () => {
    let getId = this.state.counters[this.state.counters.length - 1].id;
    let content_id = getId + 1;
    const counters = [...this.state.counters, { id: content_id, value: 2 }];
    this.setState({ counters });
  };

  renderTags() {
    if (this.state.tags.length === 0)
      return <p className="text-center text-danger">There are no tags!</p>;
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }
  render() {
    return (
      <React.Fragment>
        <Navbar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        <main className="container-fluid">
          <Routes>
            <Route
              path="/"
              element={
                <Counters
                  counters={this.state.counters}
                  onReset={this.handleReset}
                  onIncrement={this.handleIncrement}
                  onDecrement={this.handleDecrement}
                  onDelete={this.handleDelete}
                  onAdd={this.handleAdd}
                />
              }
            />
            <Route path="/temp1" element={<Shopping />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/vatavaran" element={<Vatavaran />} />
            <Route path="/ner" element={<NerTagging />} />
            <Route path="/news" element={<NewsData />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
