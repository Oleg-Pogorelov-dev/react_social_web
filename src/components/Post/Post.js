import React from 'react';
import classes from './Post.module.css'
import { Typography, Card, CardContent, Button } from '@material-ui/core';
import Comment from './Comment/Comment';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'

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
    }
  }

  render() {
    if (!localStorage.getItem('Uid')) {
      return <div><Redirect to={'/login'} /></div> 
    } 
    let showPost
    const post = this.props.data.post
    const number_post = this.props.match.params.post

    if (post[0]) {
      post.forEach(item => {
        if (item.id === Number(number_post)) {
          showPost = item
        }
      });
    }
    

    const onRedactClick = () => {
      if (showPost.user_id === this.props.data.profile.id) {
        this.setState({ id: showPost.id, title: showPost.title, 
          description: showPost.description, 
          redact: true })
      }
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

    const onDelete = () => {
      this.props.deletePost(showPost.id)
    }

    if (showPost) {
      return (
          <Card className={classes.card}>
            <div className={classes.info} >
              <p className={classes.date} >
                Created at:{' ' + showPost.created_at}
              </p>
              <p className={classes.user_id}>
                User ID:{' ' + showPost.user_id}
              </p>
            </div>
              <CardContent>
                {
                  this.state.redact ? 
                    <div className={classes.post}>
                      <input id='title' className={classes.title_input} onChange={onEditChange} defaultValue={this.state.title} /><br/>
                      <textarea className={classes.description_input}
                      id='description' onChange={onEditChange} defaultValue={this.state.description}/><br/>
                      <Button className={classes.button} onClick={onEdit} variant="contained" color="primary">
                        Edit
                      </Button>{' '}
                      <Button className={classes.button} onClick={onCancel} variant="contained" color="primary">
                        Cancel
                      </Button> 
                    </div> 
                  : 
                    <div className={classes.post}>
                      { showPost.user_id === this.props.data.profile.id &&
                        <p className={classes.click_edit}>please click on the title to edit</p>
                      }
                      <Typography onClick={onRedactClick} variant="h5" component="h2" className={classes.link} >
                        {showPost.title}
                      </Typography>
                      <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                        {showPost.description}
                      </Typography></div>
                }
              <div>
                <div>
                <Link to="#" className={classes.link} dissable>
                  <Comment thisPost={showPost}
                           data={this.props.data} 
                           watchComment={this.props.watchComment}
                           addComment={this.props.addComment} />
                </Link>
                </div>
              </div>
              </CardContent>
              { showPost.user_id === this.props.data.profile.id &&
                <a className={classes.delete} onClick={onDelete} href='#'>DELETE</a>
              }
          </Card>
      )
    } else if(post.loading) {
      return (
        <p>Load</p>
      )
    } else {
      return (
        <p>This post is undefined :(</p>
      )  
    }
  }
}

export default Post;