import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

let header;


const login = async (username, password) => {
	const response = await axios.post(API_URL + "/user/login", {
		username,
		password
	});

	const jwt = Buffer.from(response.data.split(".")[1], "base64").toString("utf-8");
	console.log(jwt);

	header = {
		"Authentication": "Bearer" + jwt
	}

	return JSON.parse(jwt);
}

const getAllEstablishments = async () => {
	const response = await axios.get(API_URL + "/establishment/", {
		headers: header
	})
}

const getEstablishment = async (establishmentId) => {
	const response = await axios.get(`${API_URL}/establishment/${establishmentId}`, {
		headers: header
	});

	console.log(response.data);
	console.log(response);
	return response;
}

export { login, getEstablishment }