import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer } from '../reducers/authReducer';
import { FavReducer } from '../reducers/favReducer';

const reducer = {
    auth: AuthReducer,
    fav: FavReducer
}

export const store = configureStore({
    reducer,
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
}
);