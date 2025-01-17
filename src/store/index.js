import { createStore , combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/reducer'

const rootReducer = combineReducers({
    reducer: reducer,
}) 

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;