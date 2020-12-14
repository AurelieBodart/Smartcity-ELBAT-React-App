import React from "react";
import {
	Button,
	TextField,
	Grid,
	Paper,
	Typography
} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import LoginIcon from "@material-ui/icons/AccountCircle"
import { login } from "../API";
import {connect} from "react-redux";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			loaded: false,
			loading: false,
			error: false,
			errorMessage: "",
			connected: false
		};
	}

	dismissError() {
		this.setState({ error: "" });
	}

	async handleSubmit() {
		this.setState({
			error: false,
			errorMessage: "",
			loading: true,
			loaded: false,
		});

		try {
			const data = await login(this.state.username, this.state.password);

			if (data.accessLevels.length === 1)
				throw new Error("Un client ne peut se connecter à cette partie de l'application !");

			this.props.login(data);
			this.setState({connected : true});

		} catch (e) {
			this.setState({
				error: true,
				loading: false,
				loaded: true,
				errorMessage: e.message
			});
		}
	}

	handleUserChange(evt) {
		this.setState({
			username: evt.target.value
		});
	};

	handlePassChange(evt) {
		this.setState({
			password: evt.target.value
		});
	}

	render() {
		if (this.state.connected === true)
			return <Redirect to="/" />

		let Content;

		if (this.state.loaded === false)
			Content = null;
		else if (this.state.loading === true)
			Content =
				<Grid item>
					<Typography component="h6" color="error">Chargement en cours...</Typography>
				</Grid>;
		else if (this.state.error)
			Content =
				<Grid item>
					<Typography component="h6" color="error">{this.state.errorMessage}</Typography>
				</Grid>;

		return (
			<Grid container spacing={0} justify="center" direction="row">
				<Grid item>
					<Grid
						container
						direction="column"
						justify="center"
						spacing={2}
						className="login-form"
					>
						<Paper
							variant="elevation"
							elevation={2}
							className="login-background"
						>
							<Grid item>
								<Typography component="h1" variant="h5">
									Se connecter
								</Typography>
							</Grid>
							<Grid item>
								<Grid container direction="column" spacing={2}>
									<Grid item>
										<TextField
											type="text"
											label="Nom d'utilisateur"
											fullWidth
											variant="outlined"
											value={this.state.username}
											onChange={(event) =>
												this.handleUserChange(event)
											}
											required
											autoFocus
										/>
									</Grid>
									<Grid item>
										<TextField
											type="password"
											label="Mot de passe"
											fullWidth
											variant="outlined"
											value={this.state.password}
											onChange={(event) =>
												this.handlePassChange(event)
											}
											onKeyPress={event => {
												if (event.code === "Enter" || event.code === "NumpadEnter") {
													this.dismissError();
													this.handleSubmit().then();
												}
											}}
											required
										/>
									</Grid>
									{ Content && Content }
									<Grid item>
										<Button
											startIcon={<LoginIcon />}
											variant="contained"
											color="primary"
											type="submit"
											className="button-block"
											onClick={() => {
												this.dismissError();
												this.handleSubmit().then();
											}}
										>
											Connexion
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (user) => {
			dispatch({type: "login", payload:{ userInfo: user }});
		}
	}
};

export default connect(undefined, mapDispatchToProps)(LoginForm);