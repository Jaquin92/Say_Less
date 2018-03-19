import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, search } from "../ducks/reducer";
import TextField from 'material-ui/TextField';
import Icon from "./Icon";


class Header extends Component {
  constructor() {
    super()

    this.state = {
      search: ""
    }

  }

  componentDidMount() {
    this.props.getUser()
  }

  search() {
    this.setState({ search: "" })
  }
  render() {
    return (


      <div className="Header">

        <div className="logoNav">
          <div className="headLogo" >
            <img className="logo" src={require("../images/logo.gif")} alt="" />
            <h1>SL</h1>

          </div>


          <div className="nav">
            <Link to="/">
              <span>Home</span>
            </Link>
            <Link to="/Software">
              <span>Software</span>
            </Link>
            <Link to="/Hardware">
              <span>Hardware</span>
            </Link>
            <Link to="/Crypto">
              <span>Crypto</span>
            </Link>
            <Link to="/Climate">
              <span>Climate</span>
            </Link>
          </div>

        </div>
        <div className="iconHeader">
          <Icon />

          <div  >

            <TextField
              hintText="Search..."
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value })}
            />


            <Link to="/search"> <button onClick={() => {
              this.search()
              this.props.search(this.state.search.toLowerCase())
            }} >
              search</button></Link>
          </div>


        </div>





      </div>





    );
  }
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser, search })(Header));
