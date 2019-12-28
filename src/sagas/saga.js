// fetch('https://postify-api.herokuapp.com/posts', {
//       method: 'GET',
//       headers: new Headers ({
//         'Content-Type': 'application/json',
//         'Access-Token': localStorage.getItem('Access-Token'),
//         'Client': localStorage.getItem('Client'),
//         'Uid': localStorage.getItem('Uid'),
//       })
//     }).then(response => {
//       return response.json()
//     }).then(response => {
//       console.log(response)
//     })
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { store } from '../store/configureStore';
import { postReducer } from '../reducers/posts';
import { rootReducer } from '../reducers';

//   const {takeEvery} = ReduxSaga;
//   const {put, call} = ReduxSaga.effects;
  
export function reducerPost(state = {
  title: '',
  description: '',
}, action) {
    switch (action.type) {
      case 'REQUESTED_POST':
        return {
          url: '',
          loading: true,
          error: false,
        };
      case 'REQUESTED_POST_SUCCEEDED':
        return action.data
      default:
        return state;
    }
};
  
export function reducerCurrentPost(state = {
  id: null,
  title: '',
  description: ''
}, action) {
  console.log('action',action)
  switch (action.type) {
    case 'REQUESTED_CURRENT_POST':
      return action.data
    default:
      return state;
  }
}

export function reducerComment(state = {
  message: '',
}, action) {
    switch (action.type) {

      case 'REQUESTED_COMMENT_SUCCEEDED':
        return action.data
      default:
        return state;
    }
};




// Action Creators
const requestPost = () => {
    return { type: 'REQUESTED_POST' }
};

const requestPostSuccess = (data) => {
  return { type: 'REQUESTED_POST_SUCCEEDED', data }
};

const requestCurrentPost = (data) => {
    return { type: 'REQUESTED_CURRENT_POST', data }
};

const requestCommentSuccess = (data) => {
  return { type: 'REQUESTED_COMMENT_SUCCEEDED', data }
};

const requestPostError = () => {
    return { type: 'REQUESTED_POST_FAILED' }
};

const fetchPost = () => {
    return { type: 'FETCHED_POST' }
};

  // Sagas
export function* watchFetchPost() {
  yield takeEvery('FETCHED_POST', fetchPostAsync)
  yield takeEvery('ADD_POST', fetchAddPostAsync)
  yield takeEvery('ADD_COMMENT', fetchAddCommentAsync)
  yield takeEvery('FETCHED_EDIT_POST', fetchEditPostAsync)
  yield takeEvery('FETCHED_COMMENT', fetchCommentAsync)
  yield takeEvery('CURRENT_POST', fetchCurrentPostAsync)
}
  

  function* fetchPostAsync() {
    try {
      const data = yield call(() => {
        return fetch('https://postify-api.herokuapp.com/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Token': localStorage.getItem('Access-Token'),
                        'Client': localStorage.getItem('Client'),
                        'Uid': localStorage.getItem('Uid'),
                    }})
                .then(res => res.json())
                .then(data => {
                  return data
                })
        } 
      );
      console.log('DATA', data)
      yield put(requestPostSuccess(data));
    } catch (error) {
      yield put(requestPostError());
    }
  }



  function* fetchCommentAsync() {
    try {
      const data = yield call(() => {
        return fetch('https://postify-api.herokuapp.com/comments', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Token': localStorage.getItem('Access-Token'),
                        'Client': localStorage.getItem('Client'),
                        'Uid': localStorage.getItem('Uid'),
                    }})
                .then(res => res.json())
                .then(data => {
                  return data
                })
        } 
      );
      yield put(requestCommentSuccess(data));
    } catch (error) {
      yield put(requestPostError());
    }
  }


function* fetchAddPostAsync(data) {
  fetch('https://postify-api.herokuapp.com/posts', {
    method: 'POST',
    body: JSON.stringify(data.data),
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': localStorage.getItem('Access-Token'),
      'Client': localStorage.getItem('Client'),
      'Uid': localStorage.getItem('Uid'),
  }})
}

function* fetchAddCommentAsync(data) {
  fetch('https://postify-api.herokuapp.com/comments', {
    method: 'POST',
    body: JSON.stringify(data.data),
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': localStorage.getItem('Access-Token'),
      'Client': localStorage.getItem('Client'),
      'Uid': localStorage.getItem('Uid'),
  }})
}

function* fetchEditPostAsync(data) {
  fetch(`https://postify-api.herokuapp.com/posts/${data.data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data.data),
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': localStorage.getItem('Access-Token'),
      'Client': localStorage.getItem('Client'),
      'Uid': localStorage.getItem('Uid'),
  }})
}

function* fetchCurrentPostAsync(id) {
  const data = yield call(() => {
    fetch(`https://postify-api.herokuapp.com/posts/${id.id}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Access-Token': localStorage.getItem('Access-Token'),
                      'Client': localStorage.getItem('Client'),
                      'Uid': localStorage.getItem('Uid'),
                  }})
              .then(res => res.json())
              .then(data => {
                console.log(data)
                return data
              })
    })
    console.log('DATA COMMENT', data)
    yield put(requestCurrentPost(data));
} 
