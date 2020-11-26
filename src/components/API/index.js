const api = require("./http");

const login = async (username, password) => {
	if (username !== "" && password !== "") {
		return await api.login(username, password);
	} else throw new Error("Identifiant(s) manquant(s)");
}

const getEstablishment = async (establishmentId) => {
	return await api.getEstablishment(establishmentId);
}

export {
	login,
	getEstablishment
}
