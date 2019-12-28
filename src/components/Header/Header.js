import React from 'react';
import classes from './Header.module.css';
import {Link, Redirect} from 'react-router-dom'
import { AppBar, Tabs, Tab } from '@material-ui/core';

class Header extends React.Component {
  state ={
    redirect: false
  }

  logOut = () => {
    localStorage.clear()
    this.setState({ redirect: true })
    window.location.reload();
  }
  render () {
    console.log(this.state)
    if (this.state.redirect)
      return <div><Redirect to={'/main'} /></div> 
    return (       
        <AppBar position="fixed">
            <Tabs aria-label="simple tabs example">
              <Link to='/main' className={classes.link} >
                <Tab label="Main page" />
              </Link>
                {
                  !localStorage.getItem('Uid') ?
                    <div className={classes.tabs_log}>
                        <Link to='/sign_up' className={classes.link} >
                          <Tab label="Sign up" />    
                        </Link>  
                        <Link to='/login' className={classes.link} >         
                          <Tab label="Log In" />
                        </Link> 
                    </div>
                  : <div className={classes.tabs_log}>        
                      <Tab onClick={this.logOut} label="Log Out" />
                      <Link to='/profile' className={classes.link} >
                          <Tab label="Profile" />    
                      </Link>
                    </div>
                }
            </Tabs>
        </AppBar>
    )
  }
}         

export default Header;
