import React from 'react';
import classes from './Registration.module.css'
import { TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom'


class Registration extends React.Component {
  state = { 
    email: '',
    password: '',
    passwrod_confirmation: '',
    firs_name: '',
    last_name: '',
    redirect: false
  }

  onInputChange = (e) => {
    const { name } = e.currentTarget
    this.setState({ [name]: e.currentTarget.value })
  }

  onBtnClick = () => {  
    fetch('https://postify-api.herokuapp.com/auth', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
      if (res.status == 'success'){
        fetch('https://postify-api.herokuapp.com/auth/sign_in', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers: {
          'Content-Type': 'application/json'
          }
        })
        .then(response => {
          localStorage.setItem( 'Access-Token', response.headers.get('Access-Token'));
          localStorage.setItem('Client', response.headers.get('Client'));
          localStorage.setItem('Uid', response.headers.get('Uid'));
          window.location.reload();
        })
      }
    })
  }

  render () {
    const redirect = this.state.redirect
    if (redirect || localStorage.getItem('Uid')) {
      return <div><Redirect to={'/main'} /></div> 
    }
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField 
            name='email'
            className={classes.input} 
            required 
            id="standard-required" 
            label="Email"
            onChange={this.onInputChange}
          /><br/>
          <TextField
            name='password'
            className={classes.input}
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={this.onInputChange}
          />  
          <TextField
            name='passwrod_confirmation'
            className={classes.input}
            id="standard-password-input"
            label="Password confirmation"
            type="password"
            autoComplete="current-password"
            onChange={this.onInputChange}
          /> 
          <TextField 
            name='firs_name'
            className={classes.input}
            id="standard-search" 
            label="First name" 
            type="search"
            onChange={this.onInputChange} 
          />
          <TextField 
            name='last_name'
            className={classes.input}
            id="standard-search" 
            label="Last name" 
            type="search"
            onChange={this.onInputChange} 
          /><br/>
          <Button onClick={this.onBtnClick} variant="contained" color="primary">
            Sign up
          </Button>
        </div>
      </form>
    );
  }
}

export default Registration;



const f = {
  "email": "example@mail.com", 
  "password": "11111111" 
}
//   const r = {
//      "email": "example@mail.com", 
//      "password": "11111111", 
//      "passwrod_confirmation": "11111111", 
//      "first_name": "", 
//      "last_name": ""
//   }
// fetch('https://postify-api.herokuapp.com/auth', {
//     method: 'POST',
//     body: JSON.stringify(r),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })

  // fetch('https://postify-api.herokuapp.com/auth/sign_in', {
  //     method: 'POST',
  //     body: JSON.stringify(f),
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // })