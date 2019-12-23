export const SET_TITLE = 'SET_TITLE'
export const SET_DISCRIPTION = 'SET_DISCRIPTION'

export function addPost(title, discription) {
  return dispatch => {
    dispatch({
      type: SET_TITLE,
      payload: title,
    })

    dispatch({
      type: SET_DISCRIPTION,
      payload: discription,  
    })
  }
}

