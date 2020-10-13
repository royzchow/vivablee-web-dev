import React from 'react';
import Contact from "./components/Contact";
import Home from "./pages/Home";
import Chillful from "./pages/Chillful";
import Supportful from "./pages/Supportful";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div style={{width: "100%"}}>
        <Route exact path="/" component={Home} />
        <Route exact path="/Chillful" component={Chillful} />
      </div>
    </Router>
  );
}

export default App;
