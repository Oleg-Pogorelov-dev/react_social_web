import React from 'react';
import classes from './Post.module.css'
import { Typography, Card, CardActionArea, CardContent } from '@material-ui/core';
import Comment from './Comment/Comment';

class Post extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      id: null,
      title: '',
      description: '',
      visible: false,
      visible_form: false,
      redact: false,
      number_post: this.props.match.params.post,
    }
  }

  async componentDidMount(){
    this.props.currentPost(this.state.number_post)
  }

  render() {
    console.log('render',this.props.match.params.post)
    let index
    const post = this.props.data.post

    let showPost = post.find( (p) => p.id === Number(this.state.number_post))

    const onRedactClick = () => {
      this.setState({ id: showPost.id, title: showPost.title, 
        description: showPost.description, 
        redact: true })
    }

    const onCancel = () => {
      this.setState({ redact: false })
    }

    const onEditChange = (e) => {
      const { id } = e.currentTarget
      this.setState({ [id]: e.currentTarget.value })
    }

    const onEdit = () => {
      this.props.fetchEdit({ id:this.state.id, title: this.state.title, description: this.state.description})
      this.setState({ redact: false })
    }

    const findPost = () => {
      post.forEach(i => {
        if (i.id === Number(this.state.number_post)) {
          index = post.indexOf(i)
        }
      })
    }

    if (showPost) {
      {findPost()}
      return (
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                {
                  this.state.redact ? 
                    <div>
                      <input id='title' onChange={onEditChange} defaultValue={this.state.title} /><br/>
                      <input id='description' onChange={onEditChange} defaultValue={this.state.description}/>
                      <button onClick={onEdit} >Edit</button>
                      <button onClick={onCancel} >Cancel</button>  
                    </div> 
                  : 
                    <div>
                      <Typography onClick={onRedactClick} gutterBottom variant="h5" component="h2" className={classes.link} >
                        {showPost.title}
                      </Typography>
                      <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                        {showPost.description}
                      </Typography></div>
                }
              <div>
                <div>
                  <Comment thisPost={showPost}
                           data={this.props.data} 
                           watchComment={this.props.watchComment}
                           addComment={this.props.addComment} />
                </div>
              </div>
              </CardContent>
            </CardActionArea>
          </Card>
      )
    } else {
      return (
        <p>This post is undefined :(</p>
      )  
    }
  }
}

export default Post;