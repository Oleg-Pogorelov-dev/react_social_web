import { SET_TITLE, SET_DISCRIPTION } from '../actions/actions'

const initialState = { 
    id: 1, 
    title: 'Wow!!', 
    discription: 'This is my first post!', 
    comments: '',
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.payload }

    case SET_DISCRIPTION:
      return { ...state, discription: action.payload }

    default:
      return state
  }
}
