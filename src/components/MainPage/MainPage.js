import React from 'react';
import classes from './MainPage.module.css'
import {Link} from 'react-router-dom'
import { Button, Card, CardActionArea, CardContent, Typography, CardActions } from '@material-ui/core';
import { Redirect } from 'react-router-dom'

class MainPage extends React.Component {
  state = {
    title: '',
    description: '',
  }

  onBtnClick = () => {
    this.props.addPost(this.state)
    this.setState({
      title: '',
      description: '',
    })
    this.props.watchPost()
  }

  changeNewPost = (e) => {
    const { id } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  }

  render () {
    if (!localStorage.getItem('Uid')) {
      return <div><Redirect to={'/login'} /></div> 
    } 
    const comments = this.props.data.comment

    let allPosts
    if (this.props.data.post[0]) {
      allPosts = this.props.data.post.sort(function (a, b) {
        if (a.created_at > b.created_at) {
          return -1;
        }
        if (a.created_at < b.created_at) {
          return 1;
        }
        return 0;
      });
    }

    if (this.props.data.post.length) {
      allPosts = this.props.data.post.map(function (item) {
        let comCount = []
        if(comments[0]) {
          comments.forEach(i => {
            if (i.commentable_id === item.id) {
              comCount.push(i)
            }
          });
        }
        return (
            <Card key={item.id} className={classes.card}>
                <CardActionArea>
                    <CardContent>
                      <Link to={`/post/${item.id}`} className={classes.link_title}>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.link} >
                          {item.title}
                        </Typography>
                        <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                          {item.description}
                        </Typography>
                      </Link>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <label>
                        Comments:{comCount.length}
                    </label>
                </CardActions>
            </Card>
        )
      })
    } else if (this.props.data.post.loading) {
      allPosts = <p>Load...</p>
    } else {
      allPosts = <p>No posts :(</p>
    }
    return (
      <div className={classes.main}>        
        <div className={classes.position_posts}>
          {allPosts}
          <div className={classes.post_count}>
            <p>post count: {this.props.data.post.length}</p>
          </div> 
        </div>
        <form className={classes.form_post}>        
            <label>Title:</label>
            <input value={this.state.title} 
                   onChange={this.changeNewPost} 
                   className={classes.title_input} 
                   id="title">
            </input><br/>

            <textarea value={this.state.description} 
                      onChange={this.changeNewPost} 
                      id='description' 
                      className={classes.description_input} /><br/>

            <Button onClick={this.onBtnClick} variant="contained" color="primary">
              Add post
            </Button>
          </form>
      </div>
    );
  }
}

export default MainPage;