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
            user: []
        }
    }
    componentDidMount() {

        axios.get(`/api/profile/${this.props.match.params.id}`)
            .then(result => this.setState({ user: result.data[0], likes: result.data[1], posts: result.data[2] }))
            .catch(() => console.log('error'))
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

                        <div className="likesPosts"  > <div>{this.state.posts.length}-Posts</div>
                            <div>{this.state.likes.length}-Likes </div>
                        </div>

                    </div>
                    {posts}
                </div>

            </div>
        );
    }
}


const mapStateToProps = state => state;

export default withRouter(
    connect(mapStateToProps, { getUser, getPosts, getLikes })(User)
);
