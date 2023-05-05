import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';

import Dashboard from "./Pages/Dashboard";
import Movies from "./Pages/Movies";
import TvShows from "./Pages/Tvshows";
// import Dashboard from "../src/Pages/Dashboard"
// import Error from "./ErrorPage"
// import SingleCountry from "./singleCountry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/tv" element={<TvShows />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
