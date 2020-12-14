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
import { getUsersByEstablishmentId, removeWaiterFromEstablishment, updatePassword } from "../../API";
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
		getUsersByEstablishmentId(this.state.establishmentId).then(waiters => { this.setState({waiters: [...waiters]}) });
	}

	submitPasswordUpdate() {
		if (allDefined(this.state.previousPassword, this.state.newPassword, this.state.passwordConfirmation)) {
			this.setState({error: false, errorMessage: undefined});

			const previousPassword = this.state.previousPassword.trim();
			const newPassword = this.state.newPassword.trim();
			const passwordConfirmation = this.state.passwordConfirmation.trim();

			if (newPassword === passwordConfirmation) {
				updatePassword(this.state.waiters.find(waiter => this.state.selectedIndex === waiter.id).username, previousPassword, newPassword).then(
					() => {
						window.alert("La mise à jour a réussi !");
					}
				)
				.catch(error => {
					this.setState({error: true, errorMessage: error});
				});
			} else this.setState({error: true, errorMessage: "Le nouveau mot de passe et sa confirmation ne sont pas égaux !"});
		} else this.setState({error: true, errorMessage: "Tous les champs doivent être remplis"});
	}

	dismissWaiter(userId) {
		const confirmation = window.confirm("Êtes-vous sûr de délier ce serveur de l'établissement ?");

		if (confirmation) {
			removeWaiterFromEstablishment(userId, this.state.establishmentId).then(() => {
				const waiters = this.state.waiters.filter(waiter => waiter.id !== userId);
				console.log(waiters);
				window.alert("La suppression du serveur a réussi !");
				this.setState({waiters: [...waiters], selectedIndex: undefined, formType: undefined});
			}).catch(error => {
				window.alert("Erreur lors du retrait du lien entre l'employé et l'établissement. " + error);
			});
		}
	}

	render() {
		let EmployeeContent;

		if (this.state.formType !== undefined) {
			const waiter = this.state.waiters.find(waiter => waiter.id === this.state.selectedIndex);

			if (this.state.formType === "informationUpdate") {
				EmployeeContent = (
					<Paper
						style={{margin: "0 20px 20px 20px", flex: "auto"}}
					>
						<Typography variant={"h3"} color={"primary"}>
							Modifier les informations de {waiter.firstName} {waiter.lastName}
						</Typography>
						<WaiterManagement user={waiter}/>
						<Button variant={"contained"} color={"primary"} style={{marginBottom: "20px"}}>
							Confirmer la mise à jour de la personne
						</Button>
					</Paper>
				);
			} else if (this.state.formType === "passwordUpdate") {
				const Error = this.state.error ? <Typography>{this.state.errorMessage}</Typography> : undefined;

				EmployeeContent = (
					<Paper style={{margin: "0 20px 20px 20px", flex: "auto"}}>
						<Typography variant={"h3"} color={"primary"}>
							Changement du mot de passe de {waiter.firstName} {waiter.lastName}
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
												<IconButton onClick={() => {this.setState({formType: "informationUpdate", selectedIndex: waiter.id})}}>
													<Edit />
												</IconButton>
											</Tooltip>
											<Tooltip title={"Modifier le mot de passe de la personne"} placement={"top"}>
												<IconButton onClick={() => {this.setState({formType: "passwordUpdate", selectedIndex: waiter.id})}}>
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