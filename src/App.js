import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';
import { Paper } from '@material-ui/core';
import { addPost } from './actions/actions';
import { BrowserRouter, Route } from 'react-router-dom'
import Registration from './components/Registration/Registration';

class App extends React.Component {
  render() {
    const { post, addPostAction } = this.props
    
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Paper className="paper">
            <Route path='/main' render={ () => 
              <MainPage data={post} 
                      addPost={addPostAction} />} />
            <Route path='/sign_up' render={ () => 
              <Registration />} />
          </Paper>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = store => {
  return {
    post: store,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPostAction: (title, discription) => dispatch(addPost(title, discription))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
