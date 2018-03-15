import React, { Component } from 'react';

import { getUser, getPosts } from "../ducks/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom"
import { Card, CardHeader } from 'material-ui/Card';
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";
import axios from 'axios';

class SearchResults extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],

        }
    }

    componentDidMount() {
        let search


        axios.get(`/api/search/${this.props.match.params.id}`).then(response => this.setState({ posts: response.data })).catch(err => console.log(err))


    }

    render() {


        let posts = this.state.posts.map((item, i) => {

            let path = <Link to={`/entry/${item.id}`} > {item.title.toUpperCase()}  </Link>
            let userName = <Link to={`/user/${item.userid}`}>{item.name}</Link>
            return <div className="thumbRow"  >



                <div className="inThumb" >
                    <img className="postThumb" src={item.img} alt="" />


                    <div className="secondInThumb" >
                        <span className="categoryThumb" >{item.category}</span>
                        <span className="nameThumb" >{userName}</span>
                        <span className="titleThumb"  >{path}</span>
                    </div>

                </div>

                <div className="thirdInThumb"  >
                    <span> <Moment fromNow >{new Date(item.time).toLocaleString()}</Moment>
                    </span>

                    <span> Likes {item.rating}</span>  </div>

            </div>
        })
        return <div className="postContainer">


            <div className="postNav" >
                <span>Discussions</span>
                <div className="sort" >  <div className="sortButton" onClick={() => this.sortPostsNew()} >Latest</div>
                    <div className="sortButton" onClick={() => this.sortPostsPop()}   >Popular</div> </div>

            </div>

            {posts}</div>



    }



}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(SearchResults));