import React, { Component } from "react";
import Header from "./components/Header";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import routes from "./routes";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

class App extends Component {

  handleChange = (event, index, value) => this.setState({ value });
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Header />
          <div className="constant">
            {routes}

            {this.props.loggedIn && (
              <DropDownMenu
                value={1}
                onChange={this.handleChange}
                className="newPost"
                autoWidth={false}
              >
                <MenuItem value={1} primaryText="New Post" />
                <Link to="/post/Software">
                  {" "}
                  <MenuItem value={2} primaryText="Software" />
                </Link>
                <Link to="/post/Hardware">
                  <MenuItem value={2} primaryText="Hardware" />
                </Link>
                <Link to="/post/Crypto">
                  <MenuItem value={4} primaryText="Crypto" />
                </Link>
                <Link to="/post/Climate">
                  <MenuItem value={5} primaryText="Climate" />
                </Link>
              </DropDownMenu>
            )}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(App));
