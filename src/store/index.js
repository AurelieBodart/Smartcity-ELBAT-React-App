import { createStore, combineReducers } from "redux";

const userReducer = (state = {user : {}}, action) => {
    switch (action.type) {
        case "login" :
            return {userStore : action.payload.userInfo};
        default :
            return state;
    }
}

const establishmentReducer = (state = {establishment : {}}, action) => {
    switch (action.type) {
        case "establishment" :
            return {establishmentStore : action.payload.establishmentInfo};
        default :
            return state;
    }
}

const store = createStore(combineReducers({ login: userReducer, establishmentChosen : establishmentReducer }));

export default store;