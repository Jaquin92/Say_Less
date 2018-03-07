import React, { Component } from "react";
import { Card, CardHeader } from 'material-ui/Card';
import axios from "axios";
import { getLikes, getUser, getPosts } from "../ducks/reducer";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";


class User extends Component {
    constructor() {
        super()

        this.state = {
            likes: [],
            posts: [],
            user: [],
            likedPosts: [],
            myPosts: []
        }
    }
    componentDidMount() {

        axios.get(`/api/profile/${this.props.match.params.id}`)
            .then(result => {
                this.setState({ user: result.data[0], likes: result.data[1], myPosts: result.data[2], posts: result.data[2] })
                axios.get(`/api/liked/${this.state.user.authid}`).then(response => {
                    this.setState({ likedPosts: response.data })


                })
            })
            .catch(() => console.log('error'))

    }

    sortPostsNew() {
        let newest = this.state.posts.sort((a, b) => {
            return b.id - a.id
        })

        this.setState({ posts: newest })

    }

    sortPostsPop() {
        let popular = this.state.posts.sort((a, b) => {
            return b.rating - a.rating
        })
        this.setState({ posts: popular })
    }


    likedPosts() {
        this.setState({ posts: this.state.likedPosts })
    }

    userPosts() {
        this.setState({ posts: this.state.myPosts })
    }

    render() {

        let posts = this.state.posts.map((item, i) => {
            let path = <Link to={`/entry/${item.id}`} > {item.title}  </Link>
            let userName = <Link to={`user/${this.state.user.id}`}>  {item.name} </Link>
            // let userImg = <Link to={`entry/${this.state.user.id}`}>  {item.img} </Link>
            return <Card key={i} >
                <CardHeader
                    title={userName}
                    avatar={item.img}
                    subtitle={path}

                    actAsExpander={true}

                />

            </Card>
        })

        return (
            <div className="postContainer">

                <div>
                    <div className="postRow">
                        <div>
                            <img className="profilePic" src={this.state.user.img} alt="" />{" "}
                            {this.state.user.name}{" "}
                        </div>

                        <div className="likesPosts"  > <div onClick={() => this.userPosts()} >{this.state.posts.length}-Posts</div>
                            <div onClick={() => this.likedPosts()} >{this.state.likes.length}-Likes </div>
                        </div>

                    </div>
                    <div className="postNav" >
                        <span> {this.state.user.name}'s Discussions</span>
                        <div className="sort" >  <div className="sortButton" onClick={() => this.sortPostsNew()} >Latest</div>
                            <div className="sortButton" onClick={() => this.sortPostsPop()}  >Popular</div> </div>
                    </div>
                    <div>{posts}</div>
                </div>

            </div>
        );
    }
}


const mapStateToProps = state => state;

export default withRouter(
    connect(mapStateToProps, { getUser, getPosts, getLikes })(User)
);
