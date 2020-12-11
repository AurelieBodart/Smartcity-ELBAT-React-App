import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import LoginForm from "../components/LoginScreen";
import AddEstablishment from '../components/admin/establishmentManagement/AddEstablishment';
import AddWaiter from '../components/admin/waiterManagement/AddWaiter';
import EstablishmentsList from "../components/admin/EstablishmentsList";
import TopBar from "../components/TopBar";
import EditEstablishment from "../components/admin/establishmentManagement/EditEstablishment";
import UpdateEstablishment from "../components/admin/establishmentManagement/UpdateEstablishment";
import {connect} from "react-redux";
import Waiter from "../components/waiter";
import EmployeesList from "../components/admin/waiterManagement/EmployeesList";

class Routes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: undefined
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.state.user === undefined)
			this.setState({ user : this.props.userStore });
	}

	render() {
		return(
			<div>
				<Router>
					<TopBar />
					<Switch>
						<Route path="/addEstablishment" render={
							() => {
								return this.state.user === undefined ? <Redirect to="/login"/> :
									(this.state.user.accessLevels.some(accessLevel => accessLevel.accessLevel === "admin") ? <AddEstablishment/> : <Redirect to="/"/>)
							}
						}/>
						<Route path="/updateEstablishment" render={
							() => {
								return this.state.user === undefined ? <Redirect to="/login"/> :
									(this.state.user.accessLevels.some(accessLevel => accessLevel.accessLevel === "admin") ? <UpdateEstablishment/> : <Redirect to="/"/>)
							}
						}/>
						<Route path="/addWaiter" render={
							() => {
								return this.state.user === undefined ? <Redirect to="/login"/> :
									(this.state.user.accessLevels.some(accessLevel => accessLevel.accessLevel === "admin") ? <AddWaiter/> : <Redirect to="/"/>)
							}
						}/>
						<Route path="/editEstablishment" render={
							() => {
								return this.state.user === undefined ? <Redirect to="/login"/> :
									(this.state.user.accessLevels.some(accessLevel => accessLevel.accessLevel === "admin") ? <EditEstablishment/> : <Redirect to="/"/>)
							}
						}/>
						<Route path="/editEmployees" render={
							() => {
								return this.state.user === undefined ? <Redirect to="/login"/> :
									(this.state.user.accessLevels.some(accessLevel => accessLevel.accessLevel === "admin") ? <EmployeesList/> : <Redirect to="/"/>)
							}
						}/>
						<Route path="/login" component={LoginForm}/>
						<Route path="/" exact render={
							() => {
								return this.state.user === undefined ? <Redirect to="/login"/> :
									(this.state.user.accessLevels.some(accessLevel => accessLevel.accessLevel === "admin") ? <EstablishmentsList/> : <Waiter/>)
							}
						}/>
					</Switch>
				</Router>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userStore: state.login.userStore
	}
};

export default connect(mapStateToProps)(Routes);
