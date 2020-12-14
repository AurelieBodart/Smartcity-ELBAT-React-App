import React from "react";
import {connect} from "react-redux";
import {Button, FormControl, Grid, InputLabel, Link, MenuItem, Paper, Select, Typography} from "@material-ui/core";
import {getEstablishments} from "../API";

class ChooseEstablishment extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			user: props.userStore.userData,
			establishments: props.userStore.accessLevels.filter(accessLevel => accessLevel.accessLevel.includes("waiter"))
		}
	}

	componentDidMount() {
		const establishmentIds = this.state.establishments.map(establishment => establishment.establishmentId);

		try {
			this.setState({establishmentsLoaded: false}, async () => {
				const establishments = await getEstablishments(...establishmentIds);
				this.setState({establishments: [...establishments], establishmentsLoaded: true});
			});
		} catch (e) {
			window.alert(e);
		}
	}

	render() {
		const SelectContent = this.state.establishmentsLoaded === true ? (
			<FormControl fullWidth>
				<InputLabel id={"establishment"}>A quel établissement voulez-vous vous connecter ?</InputLabel>
				<Select
					labelId={"establishment"}
					onChange={(event) => {
						this.setState({establishmentChosen: event.target.value})
					}}
					fullWidth
					style={{textAlign: "left"}}
					value={this.state.establishmentChosen !== undefined ? this.state.establishmentChosen : ""}
				>
					{
						this.state.establishments.map(establishment => {
							return (
								<MenuItem
									key={establishment.id}
									value={establishment}
								>
									{establishment.name}
								</MenuItem>
							)
						})
					}
				</Select>
			</FormControl>

			) : undefined;

		return (
			<Paper style={{width: "600px", padding: "20px", margin: "50px auto auto auto"}}>
				<Grid container alignItems={"center"} direction={"column"} alignContent={"center"}>
					<Typography variant={"h4"} color={"primary"}>ELBAT</Typography>
					{SelectContent && SelectContent}
					<Button
						variant={"contained"}
						color={"primary"}
						style={{marginTop: "10px"}}
						onClick={() => {
							this.props.establishmentChosen(this.state.establishmentChosen);
						}}
						component={Link} to={"/"}
					>
						Choisir cet établissement
					</Button>
				</Grid>
			</Paper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userStore : state.login.userStore
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		establishmentChosen: (establishment) => {
			dispatch({type : "establishment", payload : {establishmentInfo : establishment}});
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ChooseEstablishment);