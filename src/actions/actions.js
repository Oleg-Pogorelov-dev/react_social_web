export const ADD_POST = 'ADD_POST'
export const ADD_USER = 'ADD_USER'
export const ADD_COMMENT = 'ADD_COMMENT'
export const FETCHED_POST = 'FETCHED_POST'

export function addPost(title, discription) {
  return dispatch => {
    dispatch({
      type: ADD_POST,
      payload_1: title,
      payload_2: discription,
    })
  }
}

export const watchPost = () => {
  return { type: 'FETCHED_POST' }
};

export function addUser(
  email, password, password_confirm, first_name = '', last_name = ''){
    return dispatch => {
      dispatch({
        type: ADD_USER,
        payload_1: email,
        payload_2: password,
        payload_3: password_confirm,
        payload_4: first_name,
        payload_5: last_name,
      })
    }
  }

export function addComment( user_id, comment ){
  return dispatch => {
    dispatch({
      type: ADD_COMMENT,
      payload_1: user_id,
      payload_2: comment,
    })
  }
}



