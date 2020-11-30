import React from "react";
import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";
import {AccountCircle, PersonAdd} from "@material-ui/icons";
import { connect } from "react-redux";
import { getEstablishment } from "../API";
import logo from '../../Logo_Gray.png';
import AdminButtonsRouter from "../../routes/AdminButtonsRouter";

class TopBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: undefined,
			role : undefined,
			establishmentId : undefined,
			establishmentName : undefined
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.userStore !== undefined)
			this.setState({ user : this.props.userStore });
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.state.user === undefined)
			this.setState({ user : this.props.userStore });
		else if(this.state.role === undefined)
			this.defineRole();

		if(this.state.role === "waiter" && this.state.establishmentName === undefined)
			this.findEstablishmentName();
	}

	defineRole() {
		for (let accessLevel of this.state.user.accessLevels) {
			if (accessLevel.accessLevel === "admin")
				this.setState({role : "admin"});
			else if (accessLevel.accessLevel.split("_")[0] === "waiter")
				this.setState({ role: "waiter", establishmentId: parseInt(accessLevel.establishmentId) });
		}
	}

	findEstablishmentName() {
		try {
			getEstablishment(this.state.establishmentId).then(response => {
				this.setState({establishmentName: response.data.name});
			});
		} catch (e) {
			console.log(e.message);
		}
	}

	render() {
		let UserContent =
			<Grid container>
				<Grid item style={{flex: "auto"}}>
					<img src={logo} className="App-logo" alt="logo" />
				</Grid>
			</Grid>

		if (this.state.user !== undefined) {

			if (this.state.role === "admin") {

				UserContent =
					<Grid container>
						<Grid item style={{flex: "auto"}}>
							<img src={logo} className="App-logo" alt="logo" />

						</Grid>
						<Grid item style={{flex: "auto"}}>
							<Typography variant="h6" align="left">Panel admin</Typography>
						</Grid>
						<AdminButtonsRouter/>
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
							<img src={logo} className="App-logo" alt="logo" />
							<Typography
								variant="h6"
								align="left"
							>{this.state.establishmentName}</Typography>
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
			<AppBar position="sticky" alignitems="center" color="primary">
				<Toolbar>
					{UserContent && UserContent}
				</Toolbar>
			</AppBar>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userStore : state.login.userStore
	}
};

export default connect(mapStateToProps, undefined)(TopBar);