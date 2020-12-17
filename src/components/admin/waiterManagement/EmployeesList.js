import React from "react";
import {connect} from "react-redux";
import {
	ListItem,
	ListItemText,
	Paper,
	Typography,
	Grid,
	List,
	IconButton,
	Tooltip,
	Button, TextField
} from "@material-ui/core";
import {Delete, Edit, VpnKey} from "@material-ui/icons";
import {getUsersByEstablishmentId, removeWaiterFromEstablishment, updatePassword, updateUser} from "../../API";
import WaiterManagement from "./WaiterManagement";
import {allDefined} from "../../../utils";

class EmployeesList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			establishmentId: props.establishmentStore.id,
			waiters: []
		}
	}

	componentDidMount() {
		this.getWaiters();
	}

	getWaiters() {
		getUsersByEstablishmentId(this.state.establishmentId)
			.then(waiters => {
				this.setState({waiters: [...waiters], formType: undefined});
			});
	}

	loadUserData(userData) {
		if (userData !== undefined) {
			this.setState({
				waiter: {
					username: userData.username !== undefined ? userData.username : this.state.waiter.username,
					email: userData.email !== undefined ? userData.email : this.state.waiter.email,
					password: userData.password !== undefined ? userData.password : this.state.waiter.password,
					passwordConfirmation: userData.passwordConfirmation !== undefined ? userData.passwordConfirmation : this.state.waiter.passwordConfirmation,
					lastName: userData.lastName !== undefined ? userData.lastName : this.state.waiter.lastName,
					firstName: userData.firstName !== undefined ? userData.firstName : this.state.waiter.firstName,
					gender: userData.gender !== undefined ? userData.gender : this.state.waiter.gender,
					birthDate: userData.birthDate !== undefined ? userData.birthDate : this.state.waiter.birthDate,
					phoneNumber: userData.phoneNumber !== undefined ? userData.phoneNumber : this.state.waiter.phoneNumber,
					street: userData.street !== undefined ? userData.street : this.state.waiter.street,
					number: userData.number !== undefined ? userData.number : this.state.waiter.number,
					postalCode: userData.postalCode !== undefined ? userData.postalCode : this.state.waiter.postalCode,
					city: userData.city !== undefined ? userData.city : this.state.waiter.city,
					country: userData.country !== undefined ? userData.country : this.state.waiter.country
				}
			});
		}
	}

	updateUserData() {
		if (allDefined(this.state.waiter.username, this.state.waiter.lastName, this.state.waiter.firstName, this.state.waiter.gender, this.state.waiter.birthDate, this.state.waiter.phoneNumber, this.state.waiter.street, this.state.waiter.number, this.state.waiter.postalCode, this.state.waiter.city, this.state.waiter.country)) {
			updateUser(this.state.waiterId,
				this.state.waiter.username,
				this.state.waiter.lastName,
				this.state.waiter.firstName,
				this.state.waiter.gender,
				this.state.waiter.birthDate,
				this.state.waiter.phoneNumber,
				this.state.waitersAddressId,
				this.state.waiter.street,
				this.state.waiter.number,
				this.state.waiter.postalCode,
				this.state.waiter.city,
				this.state.waiter.country).then(() => {
					window.alert(`Les informations de ${this.state.waiter.firstName} ${this.state.waiter.lastName} ont bien été modifiées !`);
					this.getWaiters();
				}).catch((error) => {
				this.setState({error: true, errorMessage: error.message});
			});
		} else this.setState({error: true, errorMessage: "Tous les champs doivent être remplis !"});
	}

	submitPasswordUpdate() {
		if (allDefined(this.state.previousPassword, this.state.newPassword, this.state.passwordConfirmation)) {
			this.setState({error: false, errorMessage: undefined});

			const previousPassword = this.state.previousPassword.trim();
			const newPassword = this.state.newPassword.trim();
			const passwordConfirmation = this.state.passwordConfirmation.trim();

			if (newPassword === passwordConfirmation) {
				updatePassword(this.state.waiter.username, previousPassword, newPassword).then(
					() => {
						window.alert("La mise à jour a réussi !");
						this.getWaiters();
					}
				)
				.catch(error => {
					this.setState({error: true, errorMessage: error.message});
				});
			} else this.setState({error: true, errorMessage: "Le nouveau mot de passe et sa confirmation ne sont pas égaux !"});
		} else this.setState({error: true, errorMessage: "Tous les champs doivent être remplis !"});
	}

	dismissWaiter(userId) {
		const confirmation = window.confirm("Êtes-vous sûr de délier ce serveur de l'établissement ?");

		if (confirmation) {
			removeWaiterFromEstablishment(userId, this.state.establishmentId).then(() => {
				window.alert("La suppression du serveur a réussi !");
				this.getWaiters();
			}).catch(error => {
				window.alert("Erreur lors du retrait du lien entre l'employé et l'établissement. " + error);
			});
		}
	}

	render() {
		let EmployeeContent;
		const Error = this.state.error ? <Typography>{this.state.errorMessage}</Typography> : undefined;

		if (this.state.formType !== undefined) {
			if (this.state.formType === "informationUpdate") {
				EmployeeContent = (
					<Paper
						style={{margin: "0 20px 20px 20px", flex: "auto"}}
					>
						<Typography variant={"h3"} color={"primary"}>
							Modifier les informations de {this.state.waiter.firstName} {this.state.waiter.lastName}
						</Typography>
						<WaiterManagement user={this.state.waiter} callback={(userData) => {this.loadUserData(userData)}} />
						<Button
							variant={"contained"}
							color={"primary"}
							style={{marginBottom: "20px"}}
							onClick={() => {
								this.updateUserData();
							}}
						>
							Confirmer la mise à jour de la personne
						</Button>
					</Paper>
				);
			} else if (this.state.formType === "passwordUpdate") {
				EmployeeContent = (
					<Paper style={{margin: "0 20px 20px 20px", flex: "auto"}}>
						<Typography variant={"h3"} color={"primary"}>
							Changement du mot de passe de {this.state.waiter.firstName} {this.state.waiter.lastName}
						</Typography>
						<Grid container direction={"column"} alignItems={"center"}>
							<TextField
								color={"primary"}
								style={{minWidth: "450px", marginBottom: "10px"}}
								label={"Mot de passe actuel"}
								type={"password"}
								onChange={(event) => {
									this.setState({previousPassword: event.target.value});
								}}
							/>
							<TextField
								color={"primary"}
								style={{minWidth: "450px", marginBottom: "10px"}}
								label={"Nouveau mot de passe"}
								type={"password"}
								onChange={(event) => {
									this.setState({newPassword: event.target.value});
								}}
							/>
							<TextField
								color={"primary"}
								style={{minWidth: "450px", marginBottom: "10px"}}
								label={"Confirmation du mot de passe"}
								type={"password"}
								onChange={(event) => {
									this.setState({passwordConfirmation: event.target.value});
								}}
							/>
							{Error && Error}
							<Button
								variant={"contained"}
								color={"primary"}
								style={{marginBottom: "20px"}}
								onClick={() => {
									this.submitPasswordUpdate();
								}}
							>
								Appliquer le changement de mot de passe
							</Button>
						</Grid>
					</Paper>
				);
			}
		}

		return (
			<Grid container style={{margin: "20px 0 20px 0", paddingLeft: "20px"}}>
				<Grid item>
					<Paper
						className="table-form"
						variant="elevation"
						elevation={2}
					>
						<Typography variant={"h4"} color={"primary"}>Employés</Typography>
						<List>
							{
								this.state.waiters.map((waiter) => {
									return (
										<ListItem key={waiter.id}>
											<ListItemText primary={`${waiter.firstName} ${waiter.lastName}`} />
											<Tooltip title={"Modifier les informations de la personne"} placement={"top"}>
												<IconButton onClick={() => {
													this.setState({formType: "informationUpdate", waiter, waitersAddressId: waiter.addressId, waiterId: waiter.id})
												}}>
													<Edit />
												</IconButton>
											</Tooltip>
											<Tooltip title={"Modifier le mot de passe de la personne"} placement={"top"}>
												<IconButton onClick={() => {this.setState({formType: "passwordUpdate", waiter})}}>
													<VpnKey />
												</IconButton>
											</Tooltip>
											<Tooltip title={"Démettre la personne de ses fonctions"} placement={"top"}>
												<IconButton onClick={() => this.dismissWaiter(waiter.id)}>
													<Delete />
												</IconButton>
											</Tooltip>
										</ListItem>
									);
								})
							}
						</List>
					</Paper>
				</Grid>
				<Grid item style={{flex: "auto"}}>
					{EmployeeContent && EmployeeContent}
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		establishmentStore : state.establishmentChosen.establishmentStore
	}
}

export default connect(mapStateToProps) (EmployeesList);