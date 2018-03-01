import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import axios from 'axios';



class Post extends Component {
    constructor() {
        super()

        this.state = {
            expanded: false,
            commentInput: "",
            post: {},
            comments: []
        }
    }

    componentDidMount() {

        axios.get(`/entry/${this.props.match.params.id}`).then(response => this.setState({ post: response.data })).catch(() => console.log("error on axios Post component"))

        axios.get(`/comments/${this.props.match.params.id}`).then(response => {
            this.setState({ comments: response.data })
        }).catch(() => {
            console.log('couldnt get comments')
        })

    }

    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };

    handleToggle = (event, toggle) => {
        this.setState({ expanded: toggle });
    };

    handleExpand = () => {
        this.setState({ expanded: true });
    };

    handleReduce = () => {
        this.setState({ expanded: false });
    };

    addComment(str) {

        let body = {
            body: str,
            post: this.props.match.params.id
        }

        axios.post("/post/comment", body).then(() => alert("comment posted!")).catch(() => {
            console.log('error on add comment')
        })

        this.setState({ ...this.state })

    }



    render() {

        let comments = this.state.comments.map((item, i) => {

            return <CardHeader key={i}
                title={item.name}
                avatar={item.img}
                subtitle={item.body}
            />



        })




        let item = this.state.post[0];
        return <div className="postContainer" >
            {this.state.post[0] ? <Card  >
                <CardHeader
                    title={item.name}
                    subtitle={item.time}

                    avatar={item.img}
                />
                <CardTitle title={item.title} className="postTitle" />
                <CardText className="postBody" >
                    {item.body}
                </CardText>
                <CardActions>
                    <FlatButton label="Like" />
                    <FlatButton label="Dislike" />
                    <p>hello</p>
                </CardActions>
            </Card> : <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="" className="loading" />}
            {this.props.loggedIn &&
                <div><TextField
                    onChange={e => this.setState({ commentInput: e.target.value })}
                    hintText="Leave a comment..."
                    fullWidth={true}
                    multiLine={true}
                    rows={1}
                    rowsMax={8}
                />

                    <RaisedButton onClick={() => this.addComment(this.state.commentInput)
                    } label="Comment" fullWidth={true} /></div>
            }
            <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title="Comments"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                {/* <CardTitle title="Comments" expandable={true} /> */}
                <CardText expandable={true}>
                    {comments}
                </CardText>

            </Card>


        </div>
    }
}

const mapStateToProps = state => state;

export default withRouter(
    connect(mapStateToProps)(Post)
);


