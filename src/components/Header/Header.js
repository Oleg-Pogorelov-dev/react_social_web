import React from 'react';
import classes from './Header.module.css';
import {Link} from 'react-router-dom'
import { AppBar, Tabs, Tab } from '@material-ui/core';

class Header extends React.Component {
  
  render () {
    return (       
        <AppBar position="fixed">
            <Tabs aria-label="simple tabs example">
                <Tab label="My page" />
                <div className={classes.tabs_log}>
                    <Tab label="Log In" />              
                    <Tab label="Sign up" />
                </div>
            </Tabs>
        </AppBar>
    )
  }
}         

export default Header;
