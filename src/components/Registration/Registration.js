import React from 'react';
import classes from './Registration.module.css'
import { TextField } from '@material-ui/core';


class Registration extends React.Component {
  render () {
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField className={classes.input} required label="Login" /><br/>
          <TextField className={classes.input} required id="standard-required" label="Email" /><br/>
          <TextField
            className={classes.input}
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />  
          <TextField
            className={classes.input}
            id="standard-password-input"
            label="Password confirm"
            type="password"
            autoComplete="current-password"
          />  
        </div>
      </form>
    );
  }
}

export default Registration;
