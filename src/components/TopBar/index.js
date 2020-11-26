import React from "react";
import {AppBar, Grid, Toolbar, Typography} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import { connect } from "react-redux";
import { getEstablishment } from "../API";
import Async from "react-async";

const getEstablishmentById = async ({id}) => {
	return await getEstablishment(id);
}

class TopBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: props.user
		}
	}

	defineRole() {
		for (let accessLevel of this.state.user.accessLevels) {
			if (accessLevel.accessLevel === "admin")
				return "admin";
			else if (accessLevel.accessLevel.split("_")[0] === "waiter")
				return  { role: "waiter", establishmentId: parseInt(accessLevel.establishmentId) };
		}
	}

	render() {
		let UserContent =
			<Grid item style={{flex: "auto"}}>
				<Typography variant="h6" align="left">ELBAT</Typography>
			</Grid>;

		if (this.state.user !== undefined) {
			const role = this.defineRole();

			if (role === "admin") {
				UserContent =
					<Grid container>
						<Grid item style={{flex: "auto"}}>
							<Typography variant="h6" align="left">Panel admin - ELBAT</Typography>
						</Grid>
						<Grid
							item
							alignitems="center"
						>
							<AccountCircle
								style={{
									position: "relative", top: "4px"
								}}
							/>
							<Typography
								style={{display: "inline", paddingLeft: "10pt", paddingBottom: "5pt", margin: "auto"}}
								variant="h6"
							>
								{this.state.user.userData.firstName + " " + this.state.user.userData.lastName}
							</Typography>
						</Grid>
					</Grid>
			} else {
				UserContent =
					<Grid container>
						<Grid item style={{flex: "auto"}}>
							<Async promiseFn={getEstablishmentById} id={role.establishmentId}>
								{
									({response}) => {
										console.log(response);
										return (
											<Typography
												variant="h6"
												align="left"
											>{response.data.name}</Typography>
										)
									}
								}
							</Async>
						</Grid>
						<Grid
							item
							alignitems="center"
						>
							<AccountCircle
								style={{
									position: "relative", top: "4px"
								}}
							/>
							<Typography
								style={{display: "inline", paddingLeft: "10pt", paddingBottom: "5pt", margin: "auto"}}
								variant="h6"
							>
								{this.state.user.userData.firstName + " " + this.state.user.userData.lastName}
							</Typography>
						</Grid>
					</Grid>
			}
		}

		return (
			<AppBar position="fixed" alignitems="center" color="primary">
				<Toolbar>
					{UserContent && UserContent}
				</Toolbar>
			</AppBar>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user : state.user
	}
};

export default connect(mapStateToProps)(TopBar);