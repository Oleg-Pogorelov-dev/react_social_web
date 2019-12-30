import React from 'react';
import classes from './Profile.module.css';
import {Link, Redirect} from 'react-router-dom'
import { AppBar, Tabs, Tab, Card, CardActionArea, CardContent, Typography, CardActions, Button } from '@material-ui/core';

class Profile extends React.Component {
  render () { 
    if (!localStorage.getItem('Uid')) {
      return <div><Redirect to={'/login'} /></div> 
    } 
    let myPosts = []
    if (this.props.data.post[0] && this.props.data.profile.id) {
      if (this.props.data.post && this.props.data.profile.id) {
          this.props.data.post.forEach(item => {
            if (item.user_id == this.props.data.profile.id) {
              myPosts.push(item)
            }
          })
      }
    }
    
    const showMyPost = myPosts.map(function (item) {
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
      </Card>
      )
    })
    return ( 
          <div className={classes.profile_card}>
            <CardContent>
              <p>Email:{this.props.data.profile.email}</p>
              <p>First name:{this.props.data.profile.firs_name}</p>
              <p>Last name:{this.props.data.profile.second_name}</p>
              {showMyPost}
            </CardContent>
          </div>
        )
      
  }
}      

export default Profile;
