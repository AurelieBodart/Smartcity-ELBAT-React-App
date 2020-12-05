import { createStore, combineReducers } from "redux";



const userReducer = (state = {user : {}}, action) => {
    switch (action.type) {
        case "login" :
            return {userStore : action.payload.userInfo};
        default :
            return state;
    }
}

const establishmentReducer = (state = {establishement : {}}, action) => {
    switch (action.type) {
        case "establishmentToEdit" :
            return {establishmentStore : action.payload.establishmentInfo};
        default :
            return state;
    }
}

const store = createStore(combineReducers({ login: userReducer, establishementToEdit : establishmentReducer }));

export default store;