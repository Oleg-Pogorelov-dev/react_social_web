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
    const data = fetch('https://postify-api.herokuapp.com/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem('Access-Token'),
        'Client': localStorage.getItem('Client'),
        'Uid': localStorage.getItem('Uid'),
      }
    }).then(data => {
      return data.json()
    })
    console.log(data)
    // this.setState({email: data.email})
  }

  render () { 
    return ( 
          <div className={classes.profile_card}>
            <CardContent>
              <p>111</p>
              <p>{this.state.email}</p>
              <p></p>
              <p></p>
              <p></p>
            </CardContent>
          </div>
        )
      }
  }
        

export default Profile;
