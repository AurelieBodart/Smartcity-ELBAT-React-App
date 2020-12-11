import React from "react";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {linkToEstablishment} from "../../API";

export default class AlreadyRegisteredUser extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: undefined,
			errorMessage: "",
			establishments: props.establishments,
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps !== this.props) {
			this.setState({establishments: this.props.establishments});
		}
	}

	addUserToEstablishment() {
		if (this.state.username !== undefined && this.state.establishmentId !== undefined) {
			this.setState({error: false, errorMessage: ""});

			linkToEstablishment(this.state.username, this.state.establishmentId)
				.then(() => {
					window.alert("Le serveur a bien été ajouté à l'établissement !");
				})
				.catch((error) => {
					console.log(error);
					this.setState({error: true, errorMessage: error});
				});
		} else this.setState({error: true, errorMessage: "Tous les champs doivent être remplis !"});
	}

	render() {
		let Error = undefined;

		if (this.state.error !== undefined && this.state.error === true) {
			Error = <Typography color={"error"}>Erreur ! {this.state.errorMessage}</Typography>
		}

		return (
			<Grid container direction={"column"} alignItems={"center"}>
				<Typography variant={"h3"} color={"primary"} style={{marginTop: "20px"}}>Utilisateur déjà enregistré</Typography>
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
				<TextField
					color={"primary"}
					style={{minWidth: "450px"}}
					label={"Nom d'utilisateur de la personne"}
					onChange={(event) => {
						this.setState({username: event.target.value});
					}}
				/>
				{Error && Error}
				<Button
					color={"primary"}
					variant={"contained"}
					style={{marginTop: "10px", marginBottom: "20px"}}
					onClick={() => {
						this.addUserToEstablishment();
					}}
				>
					Ajouter à l'établissement
				</Button>
			</Grid>
		)
	}
}