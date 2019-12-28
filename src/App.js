import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';
import Post from './components/Post/Post';
import { Paper } from '@material-ui/core';
import { addPost, watchPost } from './actions/actions';
import { BrowserRouter, Route } from 'react-router-dom'
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import { postReducer } from './reducers/posts';

class App extends React.Component {
  state = {
    'Access-Token': localStorage.getItem('Access-Token'),
    'Client': localStorage.getItem('Client'),
    'Uid': localStorage.getItem('Uid'),
  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps", nextProps)
  }
  componentDidMount(){
    console.log("component did mount props", this.props)
  }

  render() {
    console.log(this.props)
    const { post, addPostAction, watchPostAction } = this.props
    
    const wrapperPost = (props) => {
      return <Post { ...props } data={post} onAddComment={this.addComment} />
    }

    // if (localStorage.getItem('Uid') !== null) {
    //   fetch('https://postify-api.herokuapp.com/auth/sign_in', {
    //     method: 'POST',
    //     headers: new Headers ({
    //       'Content-Type': 'application/json',
    //       'Access-Token': localStorage.getItem('Access-Token'),
    //       'Client': localStorage.getItem('Client'),
    //       'Uid': localStorage.getItem('Uid'),
    //     })
    //   })
    // }
    
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Paper className="paper">
            <Route path='/main' render={ () => 
              <MainPage watchPost={watchPostAction}
                        data={post} 
                        addPost={addPostAction} />} />
            <Route path='/sign_up' render={ () => 
              <Registration />} />
            <Route path='/login' render={ () => 
              <Login />} />
            <Route path='/post/:post' component={wrapperPost} />
            <Route path='/profile' render={ () => 
              <Profile data={post} addPost={addPostAction} />} />
          </Paper>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = store => {
  return {
    post: store
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPostAction: (title, discription) => dispatch(addPost(title, discription)),
    watchPostAction: () => dispatch(watchPost())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
