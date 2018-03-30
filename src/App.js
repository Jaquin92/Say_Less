import React, { Component } from "react";
import Header from "./components/Header";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import DropDownMenu from "material-ui/DropDownMenu";
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from "material-ui/MenuItem";
import routes from "./routes";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios'
import "./App.css";

class App extends Component {
  constructor() {
    super()

    this.state = { news: [] }
  }

  componentDidMount() {
    axios.get("/api/news").then(response => {

      this.setState({ news: response.data.articles })


    }).catch(() => console.log("no news"))
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  handleChange = (event, index, value) => this.setState({ value });
  render() {

    let news = this.state.news.map((item, i) => {
      if (item.urlToImage) {
        return <span>
          <img key={i} className="newsPic" src={item.urlToImage
          } alt="" /> <br />

          <a key={i} href={item.url}>{item.title}</a>  <br /> <br /> </span>
      }


    })


    return (
      <div>
        <MuiThemeProvider>
          <Header />
          <div className="constant">
            {routes}




            <div className="sidebar" >
              <div className="sideBarImg"  > <img className="sayLess" src={require("./images/sayless.png")} alt="" /> </div>
              {this.props.loggedIn && !this.props.onNewPost && (

                <Link to="newPost">     <RaisedButton className="newPost" label="New Post" />
                </Link>
              )}



              {!this.props.onNewPost && <div className="news"> <h3>What's Happening?</h3>  {news}</div>}

            </div>










          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(App));
