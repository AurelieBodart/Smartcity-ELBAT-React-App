import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import LoginForm from "../components/LoginScreen";
import AddEstablishment from '../components/admin/establishementManagement/AddEstablishment';
import AddWaiter from '../components/admin/waiterManagement/AddWaiter';
import EstablishmentsList from "../components/admin/EstablishmentsList";
import TopBar from "../components/TopBar";

export default function Routes() {
	return (
		<div>
			<Router>
				<TopBar />
				<Switch>
					<Route path="/addEstablishment" >
						<AddEstablishment/>
					</Route>
					<Route path="/addWaiter"  component={AddWaiter} />
					<Route path="/login"  component={LoginForm} />
					<Route path="/" exact component={EstablishmentsList}/>
				</Switch>
			</Router>
		</div>
	)
}