const api = require("./http");

const login = async (username, password) => {
	if (username !== "" && password !== "") {
		return await api.login(username, password);
	} else throw new Error("Identifiant(s) manquant(s)");
}

const getEstablishment = async (establishmentId) => {
	if(establishmentId !== undefined)
		return await api.getEstablishment(establishmentId);
	else throw new Error("L'identifiant de l'établissement est manquant !");
}

const getAllEstablishment = async () => {
	return await api.getAllEstablishments();

}

const postEstablishment = async (establishment) => {
	if(establishment !== undefined)
		return await api.addEstablishment(establishment);
	else throw new Error("L'établissement est manquant à la requête");
}

export {
	login,
	getEstablishment,
	postEstablishment
}
