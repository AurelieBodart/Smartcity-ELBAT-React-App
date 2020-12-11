import React from "react";
import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
				this.setState({establishmentName: response.name});
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
					<Grid container direction="row" alignItems="center">
						<Grid item>
							<Button component={Link} to={"/"}>
								<img src={logo} className="App-logo" alt="logo" />
							</Button>
							<Typography variant="h6" align="left" style={{display: "inline"}}>Panel admin</Typography>
						</Grid>
						<Grid item style={{flex: "auto"}}/>
						<Grid item>
							<AdminButtonsRouter />
						</Grid>
						<Grid
							item
							style={{marginLeft: "20px"}}
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
					<Grid container direction="row" alignItems="center">
						<Grid item>
							<Button component={Link} to={"/"}>
								<img src={logo} className="App-logo" alt="logo" />
							</Button>
							<Typography variant="h6" align="left" style={{display: "inline"}}>{this.state.establishmentName}</Typography>
						</Grid>
						<Grid style={{flex: "auto"}}/>
						<Grid
							item
							style={{marginLeft: "20px"}}
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