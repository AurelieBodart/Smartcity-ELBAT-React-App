const api = require("./http");
const { allDefined } = require("../../utils");

const login = async (username, password) => {
	if (allDefined(username, password)) {
		return await api.login(username, password);
	} else throw new Error("Identifiant(s) manquant(s)");
}

export {
	login
}