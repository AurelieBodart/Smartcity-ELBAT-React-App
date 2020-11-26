import { createStore, combineReducers } from "redux";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { isLoggedIn: true, user } : { };

export function userReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case "login":
			const newUser = payload.userData;
			return {
				isLoggedIn: true,
				user: newUser
			};
		case "logout":
			return {
				isLoggedIn: false,
				user: ""
			}
		default:
			return state;
	}
}

const store = createStore(combineReducers({ login: userReducer }));

export default store;