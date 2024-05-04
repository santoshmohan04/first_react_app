import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Counters from "./components/counters";
import Navbar from "./components/navbar";
import React, { Component } from "react";
import Weather from "./components/Weather";
import Shopping from "./components/shopping";
import Vatavaran from "./components/vatavaran";
import TodoList from "./components/todo";
import NewsData from "./components/news";

class App extends Component {
  state = {
    counters: [],
    todolist: this.getTodos(),
  };

  getTodos() {
    // getting stored items
    const temp = localStorage.getItem("todos");
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  }

  // This function will called only once

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ ...this.state, counters: counters });
  };

  handleDecrement = (counter) => {
    console.log(counter);
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    if (counters[index].value > 0) {
      counters[index].value--;
      this.setState({ ...this.state, counters: counters });
    } else {
      return;
    }
  };

  handleReset = () => {
    this.setState({ ...this.state, counters: [] });
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ ...this.state, counters: counters });
  };

  handleAdd = () => {
    let content_id = uuidv4();
    const counters = [...this.state.counters, { id: content_id, value: 0 }];
    this.setState({ ...this.state, counters: counters });
  };

  handleTotalList = (data) => {
    this.setState({ ...this.state, todolist: data });
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
          totalCounters={this.state.counters.length}
          totaltodo={this.state.todolist.length}
        />
        <main className="container-fluid">
          <Routes>
            <Route
              path={"/"}
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
            <Route path={"/temp1"} element={<Shopping />} />
            <Route path={"/weather"} element={<Weather />} />
            <Route path={"/vatavaran"} element={<Vatavaran />} />
            <Route
              path={"/todo"}
              element={<TodoList getTotalList={this.handleTotalList} />}
            />
            <Route path={"/news"} element={<NewsData />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
