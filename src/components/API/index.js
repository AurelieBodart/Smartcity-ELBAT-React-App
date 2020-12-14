import {allDefined} from "../../utils";

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

const getEstablishments = async (...establishmentIds) => {
	return await api.getEstablishments(...establishmentIds);
}

const getAllEstablishments = async () => {
	return await api.getAllEstablishments();
}

const postEstablishment = async (establishment) => {
	if(establishment !== undefined)
		return await api.addEstablishment(establishment);
	else throw new Error("L'établissement est manquant à la requête");
}

const patchEstablishment = async (establishment) => {
	if(establishment !== undefined)
		return await api.updateEstablishment(establishment);
	else throw new Error("L'établissement est manquant à la requête");
}

const postTable = async (table, idEstablishment) => {
	if(table !== undefined && idEstablishment !== undefined)
		return await api.addTable(table, idEstablishment);
	else throw new Error("La table et l'identifiant de l'établissement sont obligatoires !");
}

const deleteEstablishment = async (idEstablishment) => {
	if(idEstablishment !== undefined)
		return await api.deleteEstablishment(idEstablishment);
	else throw new Error("L'identifiant est obligatoire !");
}

const deleteTable = async (idTable, idEstablishment) => {
	if(idTable !== undefined && idEstablishment !== undefined)
		return api.deleteTable(idTable, idEstablishment);
	else throw new Error("Les identifiants de la table et de l'établissement sont obligatoires !");

}

const getAllTables = async (idEstablishment) => {
	if(idEstablishment !== undefined)
		return await api.getAllTables(idEstablishment);
	else throw new Error("L'identifiant est obligatoire !");
}

const linkToEstablishment = async (username, establishmentId) => {
	if (allDefined(username, establishmentId)) {
		return api.linkToEstablishment(username, establishmentId);
	} else throw new Error("Vous devez remplir tous les champs !");
}

const addToEstablishment = async (establishmentId, username, email, password, name, firstName, gender, birthDate, phoneNumber, street, number, postalCode, city, country) => {
	if (allDefined(establishmentId, username, email, password, name, firstName, gender, birthDate, phoneNumber, street, number, postalCode, city, country))
		return api.addToEstablishment(establishmentId, username, email, password, name, firstName, gender, birthDate, phoneNumber, street, number, postalCode, city, country);
	else throw new Error("Vous devez avoir rempli tous les champs pour continuer");
}

const getUsersByEstablishmentId = async (establishmentId) => {
	if (establishmentId !== undefined)
		return api.getUsersByEstablishmentId(establishmentId);
	else throw new Error("Vous devez choisir un établissement pour récupérer les serveurs.");
}

const removeWaiterFromEstablishment = async (userId, establishmentId) => {
	if (allDefined(userId, establishmentId))
		return api.removeWaiterFromEstablishment(userId, establishmentId);
	else throw new Error("Vous devez choisir une personne et un établissement !");
}

const updatePassword = async (username, previousPassword, newPassword) => {
	if (allDefined(username, previousPassword, newPassword)) {
		return api.updatePassword(username, previousPassword, newPassword);
	}
	else throw new Error("Tous les champs doivent être remplis afin de continuer !");
}

const getDateReservations = async (establishmentId, date) => {
	if (establishmentId && date)
		return api.getDateReservations(establishmentId, date);
	else throw new Error("Il faut choisir une date pour continuer !");
}

const setArrivalTime = async (personId, dateTimeReserved) => {
	if (personId !== undefined && dateTimeReserved !== undefined)
		return api.setArrivalTime(personId, dateTimeReserved);
	else throw new Error("Tous les champs doivent être remplis !");
}

const setExitTime = async (personId, dateTimeReserved) => {
	if (personId !== undefined && dateTimeReserved !== undefined)
		return api.setExitTime(personId, dateTimeReserved);
	else throw new Error("Tous les champs doivent être remplis !");
}

const cancelReservation = async (personId, dateTimeReserved) => {
	if (personId !== undefined && dateTimeReserved !== undefined)
		return api.cancelReservation(personId, dateTimeReserved);
	else throw new Error("Tous les champs doivent être remplis !");
}
export {
	login,
	getEstablishment,
	getEstablishments,
	getAllEstablishments,
	postEstablishment,
	postTable,
	deleteEstablishment,
	getAllTables,
	deleteTable,
	patchEstablishment,
	linkToEstablishment,
	addToEstablishment,
	getUsersByEstablishmentId,
	removeWaiterFromEstablishment,
	updatePassword,
	getDateReservations,
	setArrivalTime,
	setExitTime,
	cancelReservation
}
