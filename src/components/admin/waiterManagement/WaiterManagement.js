import React from "react";
import {
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField
} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default class WaiterManagement extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: props.user.username,
			email: props.user.email,
			name: props.user.lastName,
			firstName: props.user.firstName,
			gender: props.user.gender,
			birthDate: props.user.birthDate,
			phoneNumber: props.user.phoneNumber,
			street: props.user.street,
			number: props.user.number,
			postalCode: props.user.postalCode,
			city: props.user.city,
			country: props.user.country,
			callback: props.callback,
			newUser: !!props.newUser
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps !== this.props) {
			this.setState({
				username: this.props.user?.username,
				email: this.props.user?.email,
				name: this.props.user?.lastName,
				firstName: this.props.user?.firstName,
				gender: this.props.user?.gender,
				birthDate: this.props.user?.birthDate,
				phoneNumber: this.props.user?.phoneNumber,
				street: this.props.user?.street,
				number: this.props.user?.number,
				postalCode: this.props.user?.postalCode,
				city: this.props.user?.city,
				country: this.props.user?.country
			});
		}
	}

	render () {
		return (
			<Grid container direction={"column"} alignItems={"center"}>
				<TextField
					color={"primary"}
					style={{minWidth: "450px", marginBottom: "10px"}}
					label={"Nom d'utilisateur"}
					onChange={(event) => {
						this.state.callback({username: event.target.value});
					}}
					disabled={!this.state.newUser}
					value={this.state.username}
				/>
				<TextField
					color={"primary"}
					style={{minWidth: "450px", marginBottom: "10px"}}
					label={"Adresse mail"}
					onChange={(event) => {
						this.state.callback({email: event.target.value});
					}}
					disabled={!this.state.newUser}
					value={this.state.email}
				/>
				<TextField
					color={"primary"}
					style={{minWidth: "450px", marginBottom: "10px"}}
					label={"Mot de passe"}
					type={"password"}
					onChange={(event) => {
						this.state.callback({password: event.target.value});
					}}
					disabled={!this.state.newUser}
					value={this.state.password}
				/>
				<TextField
					color={"primary"}
					style={{minWidth: "450px", marginBottom: "10px"}}
					label={"Confirmation du mot de passe"}
					type={"password"}
					onChange={(event) => {
						this.state.callback({passwordConfirmation: event.target.value});
					}}
					disabled={!this.state.newUser}
					value={this.state.passwordConfirmation}
				/>
				<TextField
					color={"primary"}
					style={{minWidth: "450px", marginBottom: "10px"}}
					label={"Nom"}
					onChange={(event) => {
						this.state.callback({lastName: event.target.value});
					}}
					value={this.state.name}
				/>
				<TextField
					color={"primary"}
					style={{minWidth: "450px", marginBottom: "10px"}}
					label={"Prénom"}
					onChange={(event) => {
						this.state.callback({firstName: event.target.value});
					}}
					value={this.state.firstName}
				/>
				<FormControl>
					<RadioGroup
						row
						value={this.state.gender?.toUpperCase()}
						onChange={(event) => this.state.callback({gender: event.target.value})}>
						<FormControlLabel color={"primary"} value="F" control={<Radio />} label="Femme" />
						<FormControlLabel color={"primary"} value="M" control={<Radio />} label="Homme" />
						<FormControlLabel color={"primary"} value="O" control={<Radio />} label="Autre" />
					</RadioGroup>
				</FormControl>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						margin="normal"
						label="Date de naissance"
						format="dd/MM/yyyy"
						value={this.state.birthDate !== undefined ? new Date(this.state.birthDate) : new Date(new Date(Date.now()).getFullYear() - 18, new Date(Date.now()).getMonth(), new Date(Date.now()).getDate())}
						onChange={(date) => this.state.callback({birthDate: date})}
						style={{minWidth: "450px", marginBottom: "10px"}}
						invalidDateMessage="Date invalide"
						maxDate={new Date(new Date(Date.now()).getFullYear() - 18, new Date(Date.now()).getMonth(), new Date(Date.now()).getDate())}
						maxDateMessage="La personne doit être majeure pour pouvoir travailler"
					/>
				</MuiPickersUtilsProvider>
				<TextField
					color={"primary"}
					style={{minWidth: "450px", marginBottom: "10px"}}
					label={"Numéro de téléphone"}
					onChange={(event) => {
						this.state.callback({phoneNumber: event.target.value});
					}}
					value={this.state.phoneNumber}
				/>
				<TextField
					color={"primary"}
					style={{minWidth: "450px", marginBottom: "10px"}}
					label={"Rue"}
					onChange={(event) => {
						this.state.callback({street: event.target.value});
					}}
					value={this.state.street}
				/>
				<TextField
					color={"primary"}
					style={{minWidth: "450px", marginBottom: "10px"}}
					label={"Numéro"}
					onChange={(event) => {
						this.state.callback({number: event.target.value});
					}}
					value={this.state.number}
				/>
				<TextField
					color={"primary"}
					style={{minWidth: "450px", marginBottom: "10px"}}
					label={"Code postal"}
					onChange={(event) => {
						this.state.callback({postalCode: event.target.value});
					}}
					value={this.state.postalCode}
				/>
				<TextField
					color={"primary"}
					style={{minWidth: "450px", marginBottom: "10px"}}
					label={"Localité"}
					onChange={(event) => {
						this.state.callback({city: event.target.value});
					}}
					value={this.state.city}
				/>
				<TextField
					color={"primary"}
					style={{minWidth: "450px", marginBottom: "10px"}}
					label={"Pays"}
					onChange={(event) => {
						this.state.callback({country: event.target.value});
					}}
					value={this.state.country}
				/>
			</Grid>
		);
	}
}