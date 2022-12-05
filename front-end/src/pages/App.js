//import components
import React from "react";
import '../styling/app.css';
import {Routes, Route} from 'react-router-dom';

//import pages
import Movies from "./Movies";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Movies />} />
      </Routes>
    </div>
  );
}

export default App;
