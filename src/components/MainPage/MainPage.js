import React from 'react';
import classes from './MainPage.module.css'
import {Link} from 'react-router-dom'
import { Button, Card, CardActionArea, CardContent, Typography, CardActions } from '@material-ui/core';

class MainPage extends React.Component {
  state = [
    
  ]

  async componentDidMount() {
    this.props.watchPost()
  //   fetch('https://postify-api.herokuapp.com/posts', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Token': localStorage.getItem('Access-Token'),
  //       'Client': localStorage.getItem('Client'),
  //       'Uid': localStorage.getItem('Uid'),
  //     }
  //   }).then(response => {
  //     return response.json()
  //   }).then(response => {
  //     this.setState({
  //       posts: response
  //     })
  //   })
  //   this.state.forEach(i => {
  //     this.props.addPost(i.title, i.description)
  //   })
  }

  onBtnClick = () => {
    const title = this.state.title
    const description = this.state.description
    this.props.addPost(title, description)
    this.setState({
      title: '',
      description: '',
    })
  }

  changeNewPost = (e) => {
    const { id } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  }

  render () {
    let allPosts
    if (this.props.data.post.length) {
      allPosts = this.props.data.post.map(function (item) {
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
                        Comments:
                    </label>
                </CardActions>
            </Card>
        )
      })
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
            <img className={classes.ava} src='https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg' />
            
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
