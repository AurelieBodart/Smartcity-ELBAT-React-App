import React from "react";
import {Button, ButtonGroup, Grid, TextField, Typography} from "@material-ui/core";
import {cancelReservation, setArrivalTime, setExitTime} from "../API";

export default class ReservationDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			reservation: props.reservation
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props !== prevProps)
			this.setState({reservation: this.props.reservation})
	}

	handleSetArrival() {
		try {
			setArrivalTime(this.state.reservation.personId, this.state.reservation.dateTimeReserved)
				.then(() => {
					this.props.callback();
				}).catch((error) => {
					window.alert(error);
			});
		} catch (e) {
			window.alert(e);
		}
	}

	handleClientsLeft() {
		try {
			setExitTime(this.state.reservation.personId, this.state.reservation.dateTimeReserved)
				.then(() => {
					this.props.callback();
				}).catch((error) => {
					window.alert(error);
				});
		} catch (e) {
			window.alert(e);
		}
	}

	cancelReservation() {
		try {
			cancelReservation(this.state.reservation.personId, this.state.reservation.dateTimeReserved)
				.then(() => {
					this.props.callback();
				}).catch((error) => {
				window.alert(error);
			});
		} catch (e) {
			window.alert(e);
		}
	}

	render() {
		return (
			<Grid container direction={"column"} alignItems={"flex-start"}>
				<Typography
					variant={"h3"}
					color={"primary"}
				>
					{this.state.reservation.customer.firstName} {this.state.reservation.customer.lastName}
				</Typography>
				<Typography
					style={{marginTop: "10px"}}
				>
					Heure prévue : {new Date(this.state.reservation.dateTimeReserved).getUTCHours()}:{new Date(this.state.reservation.dateTimeReserved).getUTCMinutes()}
				</Typography>
				<Typography>Numéro de téléphone de contact : {this.state.reservation.customer.phoneNumber}</Typography>
				<Typography>Nombre de personnes : {this.state.reservation.customersNbr}</Typography>
				<Typography>Table en extérieur : {this.state.reservation.isOutside ? "Oui" : "Non"}</Typography>
				<TextField
					disabled
					fullWidth
					multiline
					style={{marginTop: "10px"}}
					variant={"outlined"}
					label={"Informations supplémentaires"}
					value={this.state.reservation.additionalInfo ? this.state.reservation.additionalInfo : ""}
				/>
				<Typography>Heure d'arrivée : {this.state.reservation.arrivingTime ? this.state.reservation.arrivingTime.slice(0, 5) : ""}</Typography>
				<Typography>Heure de sortie : {this.state.reservation.exitTime ? this.state.reservation.exitTime.slice(0, 5) : ""}</Typography>
				{
					this.state.reservation.isCancelled === true ? <Typography style={{margin: "auto"}} color={"error"}>Cette réservation est annulée.</Typography> : (
					this.state.reservation.arrivingTime === null ?
						<ButtonGroup
							orientation={"horizontal"}
							color={"primary"}
							variant={"contained"}
							style={{margin: "20px auto auto auto"}}
						>
							<Button
								onClick={() => {
									this.handleSetArrival();
								}}
							>
								Confirmer l'arrivée
							</Button>
							<Button
								onClick={() => {
									this.cancelReservation();
								}}
							>
								Annuler la réservation
							</Button>
						</ButtonGroup>
						: (this.state.reservation.exitTime === null ?
							<Button
								style={{margin: "20px auto auto auto"}}
								color={"primary"}
								variant={"contained"}
								onClick={() => {
									this.handleClientsLeft()
								}}
							>
								Table libérée
							</Button> :
							""
						)
					)
				}
			</Grid>
		);
	}
}