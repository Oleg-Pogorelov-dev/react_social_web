import React from 'react';
import classes from './Header.module.css';
import {Link} from 'react-router-dom'
import { AppBar, Tabs, Tab } from '@material-ui/core';

class Header extends React.Component {
  
  render () {
    return (       
        <AppBar position="fixed">
            <Tabs aria-label="simple tabs example">
              <Link to='/main' className={classes.link} >
                <Tab label="My page" />
              </Link>
                <div className={classes.tabs_log}>
                    <Link to='/sign_up' className={classes.link} >
                      <Tab label="Sign up" />    
                    </Link>            
                    <Tab label="Log In" />
                </div>
            </Tabs>
        </AppBar>
    )
  }
}         

export default Header;
