import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import MovieDetail from "./components/MovieDetail";

import Movies from "./components/Movies";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
