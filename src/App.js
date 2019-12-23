import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';
import { Paper } from '@material-ui/core';
import { addPost } from './actions/actions';

class App extends React.Component {
  render() {
    const { post, addPostAction } = this.props
    return (
      <div className="App">
        <Header />
        <Paper className="paper">
          <MainPage data={post} addPost={addPostAction} />
        </Paper>
      </div>
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
    addPostAction: add => dispatch(addPost()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
