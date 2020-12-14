import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
let header;

const login = async (username, password) => {
	const response = await axios.post(API_URL + "/user/login", {
		username,
		password
	}).catch(error => {
		if (error.response.status === 500) {
			throw new Error("Erreur de connexion");
		} else if (error.response.status === 400) {
			throw new Error("Identifiants manquants");
		} else if (error.response.status === 401) {
			throw new Error("Identifiants incorrects");
		} else if (error.response.status === 404) {
			throw new Error("Utilisateur inconnu");
		}
	});

	header = {
		'Authorization': 'Bearer ' + response.data
	}

	const jwt = Buffer.from(response.data.split(".")[1], "base64").toString("utf-8");

	return JSON.parse(jwt);
}

const getEstablishment = async (establishmentId) => {
	const response = await axios.get(`${API_URL}/establishment/${establishmentId}`, {
		headers: header
	});
	return response.data;
}

const getEstablishments = async (...establishmentIds) => {
	let establishments = [];

	for (const establishmentId of establishmentIds) {
		const response = await axios.get(`${API_URL}/establishment/${establishmentId}`, {
			headers: header
		}).catch((error) => {
			if (error.response.status === 401)
				throw new Error("Votre session est échue, veuillez vous reconnecter.");
			else if (error.response.status === 400)
				throw new Error("Les données fournies sont insuffisantes. Réessayez.");
			else if (error.response.status === 500)
				throw new Error("Erreur lors du traitement de votre demande. Veuillez vous assurer que les informations entrées sont correctes.");
		});

		establishments.push(response.data);
	}

	return establishments;
}

const getAllEstablishments = async () => {
	const response = await axios.get(API_URL + "/establishment/", {
		headers: header
	})
	return response.data;
}

const addEstablishment = async (establishment) => {
	const response = await axios.post(`${API_URL}/establishment`, {
		name : establishment.name,
		phoneNumber : establishment.phoneNumber,
		VATNumber : establishment.VATNumber,
		email : establishment.email,
		category : establishment.category,
		street : establishment.street,
		number : establishment.number,
		country : establishment.country,
		city : establishment.city,
		postalCode : establishment.postalCode

	},{headers: header});
	return response.data;
}

const updateEstablishment = async (establishment) => {
	const response = await axios.patch(`${API_URL}/establishment`, {
		id : establishment.id,
		name : establishment.name,
		phoneNumber : establishment.phoneNumber,
		VATNumber : establishment.VATNumber,
		email : establishment.email,
		category : establishment.category,
		addressId : establishment.addressId,
		street : establishment.street,
		number : establishment.number,
		country : establishment.country,
		city : establishment.city,
		postalCode : establishment.postalCode
	},{headers: header});
	return response.data;
}

const addTable = async (table, idEstablishment) => {
	return await axios.post(`${API_URL}/table`, {
		idEstablishment : idEstablishment,
		nbSeats : table.nbSeats,
		isOutside : table.isOutside
	},{headers: header});
}

const deleteEstablishment = async (idEstablishment) => {
	const response = await axios.delete(`${API_URL}/establishment`, {
		headers : header,
		data : {
			establishmentId : idEstablishment
		}
	});

	return response.data;
}

const deleteTable = async (idTable, idEstablishment) => {
	const response = await axios.delete(`${API_URL}/table`, {
		headers : header,
		data : {
			idTable : idTable,
			idEstablishment : idEstablishment
		}
	});
	return response.data;
}

const getAllTables = async (idEstablishment) => {
	const response = await axios.get(`${API_URL}/table/${idEstablishment}`, {
		headers: header
	});
	return response.data;
}

const linkToEstablishment = async (username, establishmentId) => {
	const { id: userId } = await getUserViaUsername(username);
	const response = await axios.patch(`${API_URL}/person/addToEstablishment`, {
		userId,
		establishmentId
	}, {
		headers: header
	}).catch((error) => {
		if (error.response.status === 401)
			throw new Error("Votre session est échue, veuillez vous reconnecter.");
		else if (error.response.status === 400)
			throw new Error("Les données fournies sont insuffisantes. Réessayez.");
		else if (error.response.status === 500)
			throw new Error("Erreur lors du traitement de votre demande. Veuillez vous assurer que les informations entrées sont correctes.");
	});

	return response.data;
}

const getUserViaUsername = async (username) => {
	const response = await axios.get(`${API_URL}/person/one/username/${username}`, { headers: header })
		.catch((error) => {
			if (error.response.status === 401)
				throw new Error("Votre session est échue, veuillez vous reconnecter.");
			else if (error.response.status === 400)
				throw new Error("Les données fournies sont insuffisantes. Réessayez.");
			else if (error.response.status === 500)
				throw new Error("Erreur lors du traitement de votre demande. Veuillez vous assurer que les informations entrées sont correctes.");
		});

	return response.data;
}

const addToEstablishment = async (establishmentId, username, email, password, name, firstName, gender, birthDate, phoneNumber, street, number, postalCode, city, country) => {
	const addUserResponse = await axios.post(`${API_URL}/person/`, {
		username,
		password,
		lastName: name,
		firstName,
		gender,
		birthDate,
		phoneNumber,
		email,
		address: {
			street,
			number,
			postalCode,
			city: city,
			country
		}
	}, {
		headers: header
	}).catch(error => {
		if (error.response.status === 401)
			throw new Error("Votre session est échue, veuillez vous reconnecter.");
		else if (error.response.status === 400)
			throw new Error("Les données fournies sont insuffisantes. Réessayez.");
		else if (error.response.status === 500)
			throw new Error("Erreur lors du traitement de votre demande. Veuillez vous assurer que les informations entrées sont correctes.");
	});

	if (addUserResponse.status === 201) {
		return await linkToEstablishment(username, establishmentId);
	} else throw new Error("Une erreur est survenue lors de l'inscription de l'utilisateur");
}

const getUsersByEstablishmentId = async (establishmentId) => {
	const getUsersResponse = await axios.get(`${API_URL}/person/waiters/${establishmentId}`, { headers: header })
		.catch((error) => {
			if (error.response.status === 401)
				throw new Error("Votre session est échue, veuillez vous reconnecter.");
			else if (error.response.status === 400)
				throw new Error("Les données fournies sont insuffisantes. Réessayez.");
			else if (error.response.status === 500)
				throw new Error("Erreur lors du traitement de votre demande. Veuillez vous assurer que les informations entrées sont correctes.");
		});

	return getUsersResponse.data;
}

const removeWaiterFromEstablishment = async (userId, establishmentId) => {
	const removeWaiterResponse = await axios.delete(`${API_URL}/person/removeFromEstablishment`, {
		data: {
			userId,
			establishmentId
		},
		headers: header
	}).catch((error) => {
		if (error.response.status === 401)
			throw new Error("Votre session est échue, veuillez vous reconnecter.");
		else if (error.response.status === 400)
			throw new Error("Les données fournies sont insuffisantes. Réessayez.");
		else if (error.response.status === 500)
			throw new Error("Erreur lors du traitement de votre demande.");
	});

	return removeWaiterResponse.data;
}

const updatePassword = async (username, previousPassword, newPassword) => {
	const response = await axios.patch(`${API_URL}/person/updatePassword`, {
		username,
		currentPassword: previousPassword,
		newPassword
	}, {
		headers: header
	}).catch((error) => {
		if (error.response.status === 401)
			throw new Error("Votre session est échue, veuillez vous reconnecter.");
		else if (error.response.status === 400)
			throw new Error("Les données fournies sont insuffisantes. Réessayez.");
		else if (error.response.status === 500)
			throw new Error("Erreur lors du traitement de votre demande. Veuillez vous assurer que les informations entrées sont correctes.");
	});
	console.log(response)
	return response.data;
}

const getDateReservations = async (establishmentId, date) => {
	const response = await axios.get(`${API_URL}/reservation/${establishmentId}/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, {
		headers: header
	}).catch((error) => {
		if (error.response.status === 401)
			throw new Error("Votre session est échue, veuillez vous reconnecter.");
		else if (error.response.status === 400)
			throw new Error("Les données fournies sont insuffisantes. Réessayez.");
		else if (error.response.status === 500)
			throw new Error("Erreur lors du traitement de votre demande. Veuillez vous assurer que les informations entrées sont correctes.");
	});

	// La réponse peut être undefined en cas de 404 (pas de réservation pour le jour choisi)
	return response?.data;
}

const setArrivalTime = async (personId, dateTimeReserved) => {
	const response = await axios.patch(`${API_URL}/reservation/arrivingTime`, {
		idPerson: personId,
		dateTimeReserved,
		arrivingTime: new Date().toLocaleTimeString()
	}, { headers: header})
		.catch((error) => {
			if (error.response.status === 401)
				throw new Error("Votre session est échue, veuillez vous reconnecter.");
			else if (error.response.status === 400)
				throw new Error("Les données fournies sont insuffisantes. Réessayez.");
			else if (error.response.status === 500)
				throw new Error("Erreur lors du traitement de votre demande. Veuillez vous assurer que les informations entrées sont correctes.");
		});

	return response.data;
}

const setExitTime = async (personId, dateTimeReserved) => {
	const response = await axios.patch(`${API_URL}/reservation/exitTime`, {
		idPerson: personId,
		dateTimeReserved,
		exitTime: new Date().toLocaleTimeString()
	}, { headers: header})
		.catch((error) => {
			if (error.response.status === 401)
				throw new Error("Votre session est échue, veuillez vous reconnecter.");
			else if (error.response.status === 400)
				throw new Error("Les données fournies sont insuffisantes. Réessayez.");
			else if (error.response.status === 500)
				throw new Error("Erreur lors du traitement de votre demande. Veuillez vous assurer que les informations entrées sont correctes.");
		});

	return response.data;
}

const cancelReservation = async (personId, dateTimeReserved) => {
	const response = await axios.patch(`${API_URL}/reservation/cancel`, {
		idPerson: personId,
		dateTimeReserved
	}, { headers: header})
		.catch((error) => {
			if (error.response.status === 401)
				throw new Error("Votre session est échue, veuillez vous reconnecter.");
			else if (error.response.status === 400)
				throw new Error("Les données fournies sont insuffisantes. Réessayez.");
			else if (error.response.status === 500)
				throw new Error("Erreur lors du traitement de votre demande. Veuillez vous assurer que les informations entrées sont correctes.");
		});

	return response.data;
}

export {
	login,
	getEstablishment,
	getEstablishments,
	getAllEstablishments,
	addEstablishment,
	addTable,
	deleteEstablishment,
	getAllTables,
	deleteTable,
	updateEstablishment,
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