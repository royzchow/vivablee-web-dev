import React from 'react';
import "./App.css";
import ScrollToTop from "./functions/ScrollToTop";
import Home from "./pages/Home";
import Activity from "./pages/Activity";
import Articles from "./pages/Articles";
import Meditation from "./pages/Meditation";
import ActivityDetails from "./pages/ActivityDetails";
import Supportful from "./pages/Supportful";
import Dashboard from "./pages/Dashboard";
import ActivityUpdate from "./pages/ActivityUpdate";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{width: "100%"}}>
        <Route exact path="/" component={Home} />
        <Route exact path="/Activities" component={Activity} />
        <Route exact path="/Activities/Details" component={ActivityDetails} />
        <Route exact path="/Articles" component={Articles} />
        <Route exact path="/Meditation" component={Meditation} />
        <Route exact path="/Business/Dashboard" component={Dashboard} />
        <Route exact path="/Business/ActivityUpdate" component={ActivityUpdate} />
      </div>
    </Router>
  );
}

export default App;
