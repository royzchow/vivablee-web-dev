import React from 'react';
import "./App.css";
import Home from "./pages/Home";
import Chillful from "./pages/Chillful";
import Activity from "./pages/Activity";
import Articles from "./pages/Articles";
import Supportful from "./pages/Supportful";
import Dashboard from "./pages/Dashboard";
import ActivityUpdate from "./pages/ActivityUpdate";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div style={{width: "100%"}}>
        <Route exact path="/" component={Home} />
        <Route exact path="/Activities" component={Chillful} />
        <Route exact path="/Activities/Details" component={Activity} />
        <Route exact path="/Articles" component={Articles} />
        <Route exact path="/Business/Dashboard" component={Dashboard} />
        <Route exact path="/Business/ActivityUpdate" component={ActivityUpdate} />
      </div>
    </Router>
  );
}

export default App;
