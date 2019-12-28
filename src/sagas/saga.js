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
import { call, put, takeEvery } from 'redux-saga/effects'
import { addPost } from '../actions/actions';
import { store } from '../store/configureStore';
import { postReducer } from '../reducers/posts';
import { rootReducer } from '../reducers';

//   const {takeEvery} = ReduxSaga;
//   const {put, call} = ReduxSaga.effects;
  
const globalState = {
    title: '',
    discription: '',
};
export function reducer(state = {
  title: '',
  discription: '',
}, action) {
  console.log('action',action)
    switch (action.type) {
      case 'REQUESTED_POST':
        return {
          url: '',
          loading: true,
          error: false,
        };
      case 'REQUESTED_POST_SUCCEEDED':
        return action.data
      case 'REQUESTED_POST_FAILED':
        return {
          url: '',
          loading: false,
          error: true,
        };
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

const requestPostError = () => {
    return { type: 'REQUESTED_POST_FAILED' }
};

let i

const fetchPost = () => {
    return { type: 'FETCHED_POST' }
};

  // Sagas
export function* watchFetchPost() {
    yield takeEvery('FETCHED_POST', fetchPostAsync);
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
                    console.log(i)
                })
        } 
      );
      console.log('DATA', data)
      yield put(requestPostSuccess(data));
    } catch (error) {
      yield put(requestPostError());
    }
  }
  
  











// import { take, put, call, fork, select } from 'redux-saga/effects'
// import fetch from 'isomorphic-fetch'
// import * as actions from '../actions'
// import { selectedRedditSelector, postsByRedditSelector } from '../reducers/selectors'

// export function fetchPostsApi(reddit) {
//   return fetch(`https://www.reddit.com/r/${reddit}.json`)
//     .then(response => response.json())
//     .then(json => json.data.children.map(child => child.data))
// }

// export function* fetchPosts(reddit) {
//   yield put(actions.requestPosts(reddit))
//   const posts = yield call(fetchPostsApi, reddit)
//   yield put(actions.receivePosts(reddit, posts))
// }

// export function* invalidateReddit() {
//   while (true) {
//     const { reddit } = yield take(actions.INVALIDATE_REDDIT)
//     yield call(fetchPosts, reddit)
//   }
// }

// export function* nextRedditChange() {
//   while (true) {
//     const prevReddit = yield select(selectedRedditSelector)
//     yield take(actions.SELECT_REDDIT)

//     const newReddit = yield select(selectedRedditSelector)
//     const postsByReddit = yield select(postsByRedditSelector)
//     if (prevReddit !== newReddit && !postsByReddit[newReddit]) yield fork(fetchPosts, newReddit)
//   }
// }

// export function* startup() {
//   const selectedReddit = yield select(selectedRedditSelector)
//   yield fork(fetchPosts, selectedReddit)
// }

// export default function* root() {
//   yield fork(startup)
//   yield fork(nextRedditChange)
//   yield fork(invalidateReddit)
// }