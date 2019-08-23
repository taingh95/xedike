import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//React router
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Headers from './Components/layouts/Header'
import Home from './Components/screens/Home/Home';
import Footer from './Components/layouts/Footer';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Profile from './Components/screens/Profile-default/Profile'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Headers />
        <Route path="/" exact component={Home}></Route>
        <Route path="/profile" exact component={Profile}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register"  component={Register}></Route>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
