import { createStore, combineReducers } from "redux";



const userReducer = (state = {user : {}}, action) => {
    switch (action.type) {
        case "login" :
            return {userStore : action.payload.userInfo};
        default :
            return state;
    }
}

const store = createStore(combineReducers({ login: userReducer }));

export default store;