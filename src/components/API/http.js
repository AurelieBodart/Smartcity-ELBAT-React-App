import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

const login = async (username, password) => {
	const response = await axios.post(API_URL + "/user/login", {
		"username": username,
		"password": password
	});
	return response.data;
}

export { login }