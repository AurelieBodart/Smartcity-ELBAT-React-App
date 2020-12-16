import React from "react";
import {Button, Grid, IconButton, List, ListItem, ListSubheader, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom"
import ReservationDetails from "./ReservationDetails";
import { getDateReservations as getReservationDetails } from "../API";
import {connect} from "react-redux";
import {ArrowLeft, ArrowRight} from "@material-ui/icons";

class ReservationsManagement extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			date: new Date(),
			reservationChosen: undefined,
			reservations: [],
			establishmentStore: this.props.establishmentStore
		}
	}

	componentDidMount() {
		this.updateList();
		this.setState({ intervalId: setInterval(() => this.updateList(), 30000) });
	}

	updateList() {
		this.setState({reservations: []});

		getReservationDetails(this.state.establishmentStore.id, this.state.date).then((reservations) => {
			if (reservations !== undefined) {
				this.setState({reservations: [...(reservations.sort((a, b) => {
					const date1 = new Date(a.dateTimeReserved);
					const date2 = new Date(b.dateTimeReserved);

					return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
				}))]});
			}
		}).catch((error) => {
			window.alert(error);
			clearInterval(this.state.intervalId);
			this.setState({intervalId: undefined});
		})
	}

	render() {
		return (
			<Paper style={{margin: "20px auto auto auto", width: "1300px"}}>
				<Grid container >
					<Grid item xs={3} style={{margin: "20px auto 20px 20px", flex: "auto"}}>
						<Button
							variant={"contained"}
							color={"primary"}
							component={Link} to={"/newReservation"}
							onClick={() => clearInterval(this.state.intervalId)}
							fullWidth
						>
							Ajouter une réservation
						</Button>
						<List
							subheader={
								<ListSubheader component={"div"} >
									Réservations du {new Date(this.state.date).toLocaleDateString()}
									<IconButton
										onClick={() => {
											const currentDate = new Date(this.state.date);

											if (currentDate > new Date())
												this.setState({date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1)}, () => {
													this.updateList();
												})
										}}
									>
										<ArrowLeft/>
									</IconButton>
									<IconButton
										onClick={() => {
											const currentDate = new Date(this.state.date);

											this.setState({date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)}, () => {
												this.updateList();
											});
										}}
									>
										<ArrowRight/>
									</IconButton>
								</ListSubheader>
							}
						>
							{
								this.state.reservations.length !== 0 ?
									this.state.reservations.map((reservation) => {
										return (
											<ListItem
												button
												onClick={() => {
													this.setState({reservationChosen: reservation})
												}}
												key={reservation.tableId}
												value={reservation}
											>
												<Typography>Table {reservation.tableId} - {reservation.customer.firstName} {reservation.customer.lastName} - {new Date(reservation.dateTimeReserved).getUTCHours()}:{new Date(reservation.dateTimeReserved).getUTCMinutes()}</Typography>
											</ListItem>
										)
									}) :
										<ListItem
											color={"error"}
										>
											Aucune réservation pour ce jour
										</ListItem>
							}
						</List>
					</Grid>
					{
						this.state.reservationChosen !== undefined ?
							<Grid item style={{margin: "20px", flex: "auto"}}>
								<ReservationDetails reservation={this.state.reservationChosen} callback={() => {
									this.updateList();
									this.setState({reservationChosen: undefined})
								}}/>
							</Grid>
							:
							""
					}
				</Grid>
			</Paper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		establishmentStore : state.establishmentChosen.establishmentStore
	}
};

export default connect(mapStateToProps) (ReservationsManagement);