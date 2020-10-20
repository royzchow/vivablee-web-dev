import React from 'react';
import "./App.css";
import Home from "./pages/Home";
import Chillful from "./pages/Chillful";
import Activity from "./pages/Activity";
import Supportful from "./pages/Supportful";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div style={{width: "100%"}}>
        <Route exact path="/" component={Home} />
        <Route exact path="/Chillful" component={Chillful} />
        <Route exact path="/Chillful/Activity" component={Activity} />
      </div>
    </Router>
  );
}

export default App;
