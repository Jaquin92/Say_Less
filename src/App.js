import React, { Component } from "react";
import Header from "./components/Header";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import routes from "./routes";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Header />
          {routes}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
