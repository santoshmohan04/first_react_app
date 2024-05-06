import React from "react";
import { Route, Routes } from "react-router-dom";
import TopHeader from "./components/navbar";
import Login from "./components/login";
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Counters from './components/counters';
import Shopping from './components/shopping'
import Weather from './components/Weather'
import Vatavaran from './components/vatavaran'
import TodoList from './components/todo'
import NewsData from './components/news'


import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/signup" element={<PublicRoute />}>
          <Route path="/signup" element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<TopHeader />}>
            <Route path={"/temp1"} element={<Shopping />} />
            <Route path={"/weather"} element={<Weather />} />
            <Route path={"/vatavaran"} element={<Vatavaran />}/>
            <Route path={"/todo"} element={<TodoList />} />
            <Route path={"/news"} element={<NewsData />} />
            <Route path={"/"} element={<Counters />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
