import React from 'react';
import classes from './Profile.module.css';
import {Link, Redirect} from 'react-router-dom'
import { AppBar, Tabs, Tab, Card, CardActionArea, CardContent, Typography, CardActions, Button } from '@material-ui/core';

class Profile extends React.Component {
  state = {
    email: '',
    firs_name: '',
    last_name: '',
  }

  componentWillMount() {
    fetch('https://postify-api.herokuapp.com/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem('Access-Token'),
        'Client': localStorage.getItem('Client'),
        'Uid': localStorage.getItem('Uid'),
      }
    }).then(response => {
      return response.json()
    }).then(response => {
      this.setState({
        email: response.email,
        firs_name: response.firs_name,
        last_name: response.last_name,
      })
    })
  }

  render () {
    
    // this.state.forEach( i => {
    //   this.addPost(i.title, i.discription)
    // });    
    return ( 
          <div className={classes.profile_card}>
            <CardContent>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </CardContent>
          </div>
        )
      }
  }
        

export default Profile;
