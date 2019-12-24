import React from 'react';
import classes from './MainPage.module.css'
import {Link} from 'react-router-dom'
import { Button, Card, CardActionArea, CardContent, Typography, CardActions } from '@material-ui/core';

class MainPage extends React.Component {
  state = {
    title: '',
    discription: ''
  }

  onBtnClick = () => {
    const title = this.state.title
    const discription = this.state.discription
    this.props.addPost(title, discription)
    this.setState({
      title: '',
      discription: '',
    })
  }

  changeNewPost = (e) => {
    const { id, value } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  }


  render () {
    console.log(this.props)
    let allPosts
    if (this.props.data.length) {
      allPosts = this.props.data.map(function (item) {
        return (
            <Card key={item.id} className={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.title}
                        </Typography>
                        <Typography className={classes.discription} variant="body2" color="textSecondary" component="p">
                            {item.discription}
                        </Typography>
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
            <p>post count: {this.props.data.length}</p>
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

            <textarea value={this.state.discription} 
                      onChange={this.changeNewPost} 
                      id='discription' 
                      className={classes.discription_input} /><br/>

            <Button onClick={this.onBtnClick} variant="contained" color="primary">
              Add post
            </Button>
          </form>
      </div>
    );
  }
}

export default MainPage;
