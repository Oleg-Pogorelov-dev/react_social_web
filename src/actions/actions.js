export const ADD_POST = 'ADD_POST'

export function addPost(title, discription) {
  return dispatch => {
    dispatch({
      type: ADD_POST,
      payload_1: title,
      payload_2: discription,
    })
  }
}


