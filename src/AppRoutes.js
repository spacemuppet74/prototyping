import React, { Component, Fragment } from "react";
import { HashRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

import Home from "./features/Home/Home";
import AppForm from "./features/AppForm/AppForm";

class App extends Component {
  render() {
    return (
      <Router>
        <Container fluid>
          <Menu>
            <Menu.Item exact name="home" as={NavLink} to="/">
              Home
            </Menu.Item>

            <Menu.Item name="form" as={NavLink} to="/form">
              Form
            </Menu.Item>
          </Menu>
          <Switch>
            <Route path="/form" component={AppForm} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
