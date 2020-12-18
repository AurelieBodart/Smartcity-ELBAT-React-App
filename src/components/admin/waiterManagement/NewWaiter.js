import React from "react";
import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography
} from "@material-ui/core";
import {allDefined} from "../../../utils";
import { addToEstablishment } from "../../API"
import WaiterManagement from "./WaiterManagement";
import {Redirect} from "react-router-dom";

export default class NewWaiter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: undefined,
			errorMessage: "",
			establishments: this.props.establishments,
			user: {
				username: undefined,
				email: undefined,
				password: undefined,
				passwordConfirmation: undefined,
				lastName: undefined,
				firstName: undefined,
				gender: "F",
				birthDate: undefined,
				phoneNumber: undefined,
				street: undefined,
				number: undefined,
				postalCode: undefined,
				city: undefined,
				country: undefined
			}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps !== this.props) {
			this.setState({establishments: this.props.establishments});
		}
	}

	loadUserData(userData) {
		if (userData !== undefined) {
			this.setState({
				user: {
					username: userData.username !== undefined ? userData.username : this.state.user.username,
					email: userData.email !== undefined ? userData.email : this.state.user.email,
					password: userData.password !== undefined ? userData.password : this.state.user.password,
					passwordConfirmation: userData.passwordConfirmation !== undefined ? userData.passwordConfirmation : this.state.user.passwordConfirmation,
					lastName: userData.lastName !== undefined ? userData.lastName : this.state.user.lastName,
					firstName: userData.firstName !== undefined ? userData.firstName : this.state.user.firstName,
					gender: userData.gender !== undefined ? userData.gender : this.state.user.gender,
					birthDate: userData.birthDate !== undefined ? userData.birthDate : this.state.user.birthDate,
					phoneNumber: userData.phoneNumber !== undefined ? userData.phoneNumber : this.state.user.phoneNumber,
					street: userData.street !== undefined ? userData.street : this.state.user.street,
					number: userData.number !== undefined ? userData.number : this.state.user.number,
					postalCode: userData.postalCode !== undefined ? userData.postalCode : this.state.user.postalCode,
					city: userData.city !== undefined ? userData.city : this.state.user.city,
					country: userData.country !== undefined ? userData.country : this.state.user.country
				}
			});
		}
	}

	addUserToEstablishment() {
		this.setState({error: undefined, errorMessage: undefined});

		if (allDefined(this.state.establishmentId, this.state.user.username, this.state.user.email, this.state.user.password, this.state.user.passwordConfirmation, this.state.user.lastName, this.state.user.firstName, this.state.user.gender, this.state.user.birthDate, this.state.user.phoneNumber, this.state.user.street, this.state.user.number, this.state.user.postalCode, this.state.user.city, this.state.user.country)) {
			const password = this.state.user.password.trim();
			const passwordConfirmation = this.state.user.passwordConfirmation.trim();
			if (password === passwordConfirmation) {
				const emailCheckRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

				if (emailCheckRegex.test(this.state.user.email)) {
					addToEstablishment(this.state.establishmentId, this.state.user.username, this.state.user.email, password, this.state.user.lastName, this.state.user.firstName, this.state.user.gender, this.state.user.birthDate, this.state.user.phoneNumber, this.state.user.street, this.state.user.number, this.state.user.postalCode, this.state.user.city, this.state.user.country)
						.then(() => {
							window.alert("L'utilisateur a bien été ajouté à l'établissement !");
							this.setState({added: true});
						})
						.catch((error) => {
							this.setState({error: true, errorMessage: error.message});
						});
				} else this.setState({error: true, errorMessage: "Votre adresse mail n'est pas correcte !"});
			} else this.setState({error: true, errorMessage: "Les deux mots de passe doivent être les mêmes !"});
		} else this.setState({error: true, errorMessage: "Vous devez définir tous les champs pour pouvoir continuer !"});
	}

	render() {
		if (this.state.added === true)
			return <Redirect to={"/"}/>;

		let Error = undefined;

		if (this.state.error === true) {
			Error = <Typography color={"error"}>Erreur ! {this.state.errorMessage}</Typography>
		}

		return (
			<Grid container direction={"column"} alignItems={"center"}>
				<Typography variant={"h3"} color={"primary"}>Nouvel utilisateur</Typography>
				<FormControl style={{marginTop: "10px", marginBottom: "10px"}}>
					<InputLabel id={"establishment"}>Établissement dans lequel l'utilisateur sera ajouté</InputLabel>
					<Select
						color={"primary"}
						labelId={"establishment"}
						onChange={(event) => this.setState({establishmentId: event.target.value})}
						style={{minWidth: "450px", textAlign: "left"}}
						value={this.state.establishmentId !== undefined ? this.state.establishmentId : ""}
					>
						{
							this.state.establishments?.map(establishment => {
								return <MenuItem value={establishment.id} key={establishment.id}>{establishment.name}</MenuItem>
							})
						}
					</Select>
				</FormControl>
				<WaiterManagement user={this.state.user} newUser callback={(userData) => {this.loadUserData(userData)}} />
				{Error && Error}
				<Button
					color={"primary"}
					variant={"contained"}
					style={{marginTop: "10px", marginBottom: "20px"}}
					onClick={() => {
						this.addUserToEstablishment();
					}}
				>
					Confirmer l'inscription et ajouter à l'établissement
				</Button>
			</Grid>
		);
	}
}