import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {userReducer} from './reducers/userReducer'
import {questionReducer} from './reducers/questionReducer'
import { studentReducer } from './reducers/studentReducer'
const reducer=combineReducers({
    user:userReducer,
    questions:questionReducer,
    student:studentReducer
})  

let initialState ={};
const middleware=[thunk];

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;