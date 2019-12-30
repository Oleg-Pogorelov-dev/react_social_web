import React from 'react';
import classes from './Login.module.css'
import { TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom'


class Login extends React.Component {
  state = { 
    email: '',
    password: '',
    redirect: false,
  }

  onInputChange = (e) => {
    const { name } = e.currentTarget
    this.setState({ [name]: e.currentTarget.value })
  }

  onBtnClick = () => {  
    fetch('https://postify-api.herokuapp.com/auth/sign_in', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      localStorage.setItem( 'Access-Token', response.headers.get('Access-Token'));
      localStorage.setItem('Client', response.headers.get('Client'));
      localStorage.setItem('Uid', response.headers.get('Uid'));
      this.setState({ redirect: true })
      window.location.reload();
    })
  }

  render () {
    const { redirect } = this.state

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
          /><br/>
          <Button onClick={this.onBtnClick} variant="contained" color="primary">
            Sign up
          </Button>
        </div>
      </form>
    );
  }
}

export default Login;



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