import { createStore, applyMiddleware } from 'redux'

import { mainPageReducer, rootReducer } from '../reducers/main_page'
import { addPost } from '../actions/actions'

const initialState = [{ 
    id: 1, 
    title: 'Wow!!', 
    discription: 'This is my first post!', 
    comments: '',
}]

export const store = createStore(rootReducer, initialState)
