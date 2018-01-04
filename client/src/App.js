import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//pages for routes
import Pages from "./pages";
const { Home, Register, Login, Create, UserProfile } = Pages;

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create/:type" component={Create} />
            <Route path="/:profile" component={UserProfile} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
