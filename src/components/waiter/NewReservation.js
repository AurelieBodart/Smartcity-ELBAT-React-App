import React from "react";
import {
	Button,
	FormControlLabel,
	Grid,
	IconButton,
	Paper,
	Switch,
	TextField,
	Tooltip,
	Typography
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider, KeyboardDateTimePicker} from "@material-ui/pickers";
import {ArrowLeft, ArrowRight} from "@material-ui/icons";
import {fetchTables, makeReservation} from "../API"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class NewReservation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dateTime: new Date(),
			error: undefined,
			errorMessage: undefined,
			clientsNbr: 1,
			isOutside: false
		}
	}

	componentDidMount() {
		this.handleFormCompletion(new Date().toJSON().slice(0, 10));
	}

	handleReservationConfirmation() {
		let tableReserved = this.state.tables.find((table) => table.nbSeats >= this.state.clientsNbr && table.isOutside === this.state.isOutside);

		if(tableReserved !== undefined) {
			this.setState({error: undefined, errorMessage: undefined}, () => {
				if (this.state.phoneNumber !== undefined) {
					if (this.state.dateTime > new Date()) {
						makeReservation(this.state.phoneNumber,
							this.state.dateTime,
							this.state.clientsNbr,
							tableReserved.id,
							this.props.establishmentStore.id,
							this.state.additionalInformation)
							.then(() => {
								window.alert("La réservation a bien été ajoutée !");
								this.setState({added: true})
							})
							.catch((error) => {
								this.setState({error: true, errorMessage: error.message});
							});
					} else
						this.setState({error: true, errorMessage: "La date et l'heure ne peuvent pas être antérieures à maintenant."})
				} else
					this.setState({error: true, errorMessage: "Tous les champs doivent être remplis !"})
			});
		} else
			this.setState({error: true, errorMessage: "Il n'y a plus de table disponible dans cet établissement à la date choisie."})
	}

	handleFormCompletion(date) {
		this.setState({error: false, errorMessage: undefined}, () => {
			fetchTables(this.props.establishmentStore.id, date).then((tables) => {
				this.setState({tables: [...tables], clientsNbr: 1});
			}).catch((error) => {
				this.setState({error: true, errorMessage: error});
			});
		});
	}

	render() {
		if (this.state.added === true)
			return <Redirect to={"/"}/>;

		const ErrorContent = this.state.error === true ?
			<Typography variant={"caption"} color={"error"}>{this.state.errorMessage}</Typography> : undefined;

		return (
			<Grid container>
				<Paper style={{margin: "20px auto 20px auto", padding: "20px 30px", width: "700px"}}>
					<Grid container alignItems={"center"} alignContent={"center"} direction={"column"}>
						<Typography variant="h3" color="primary">Ajout d'une nouvelle réservation</Typography>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDateTimePicker
								label="Date et heure d'arrivée"
								minDate={new Date()}
								onChange={(date) => {
									this.handleFormCompletion(date.toJSON().slice(0, 10))
									this.setState({dateTime: date});
								}}
								format={"dd/MM/yyyy HH:mm"}
								value={Date.parse(this.state.dateTime)}
								ampm={false}
								fullWidth
							/>
						</MuiPickersUtilsProvider>
						<FormControlLabel
							style={{marginTop: "10px"}}
							control={<Switch
								color="primary"
								checked={this.state.isOutside}
								onChange={((event) => {
									this.setState({isOutside: event.target.checked, clientsNbr: this.state.tables.filter(table => table.isOutside === event.target.checked).length === 0 ? 0 : 1});
								})}
							/>}
							label="Table en extérieur"
							labelPlacement="end"
						/>
						<Grid container direction={"row"} alignItems={"center"} alignContent={"center"}>
							<Typography
								style={{marginLeft: "auto"}}
							>
								Nombre de personnes à table :
							</Typography>
							<Tooltip title={"Retirer une personne"} placement={"top"}>
								<IconButton
									style={{margin: "0px 10px auto 0px"}}
									color={"primary"}
									onClick={() => {
										if (this.state.clientsNbr > 1)
											this.setState({clientsNbr: this.state.clientsNbr - 1})
									}}
								>
									<ArrowLeft/>
								</IconButton>
							</Tooltip>
							<Typography>{this.state.clientsNbr}</Typography>
							<Tooltip title={"Ajouter une personne"} placement={"top"}>
								<IconButton
									style={{margin: "0px auto auto 10px"}}
									color={"primary"}
									onClick={() => {
										if (this.state.clientsNbr < Math.max(...(this.state.tables.filter((table) => table.isOutside === this.state.isOutside).map(table => table.nbSeats))))
											this.setState({clientsNbr: this.state.clientsNbr + 1})
									}}
								>
									<ArrowRight/>
								</IconButton>
							</Tooltip>
						</Grid>
						<TextField
							style={{marginTop: "10px"}}
							label={"Numéro de téléphone de contact"}
							fullWidth
							onChange={(event) => this.setState({phoneNumber: event.target.value})}
						/>
						<TextField
							style={{marginTop: "10px"}}
							label={"Informations complémentaires"}
							fullWidth
							multiline
							onChange={(event) => {
								this.setState({additionalInformation: event.target.value});
							}}
						/>
						{ErrorContent && ErrorContent}
						<Button
							style={{marginTop: "10px"}}
							onClick={() => {
								this.handleReservationConfirmation()
							}}
							color={"primary"}
							variant={"contained"}
						>
							Confirmer la réservation
						</Button>
					</Grid>
				</Paper>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		establishmentStore : state.establishmentChosen.establishmentStore
	}
};

export default connect(mapStateToProps) (NewReservation);