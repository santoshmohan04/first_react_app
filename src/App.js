import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Counter from "./components/counter";
import Template1 from "./components/template1";
import Main from "./components/main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="temp1" element={<Template1 />} />
      <Route path="counter" element={<Counter />} />
    </Routes>
  );
}

export default App;
