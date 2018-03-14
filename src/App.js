import React, { Component } from "react";
import Header from "./components/Header";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import DropDownMenu from "material-ui/DropDownMenu";
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

              {this.props.loggedIn && !this.props.onNewPost && (
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
                    <MenuItem value={3} primaryText="Hardware" />
                  </Link>
                  <Link to="/post/Crypto">
                    <MenuItem value={4} primaryText="Crypto" />
                  </Link>
                  <Link to="/post/Climate">
                    <MenuItem value={5} primaryText="Climate" />
                  </Link>
                </DropDownMenu>)}



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
