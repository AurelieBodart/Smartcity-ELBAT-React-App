import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import LoginForm from "../components/LoginScreen";
import AddEstablishment from '../components/admin/establishmentManagement/AddEstablishment';
import AddWaiter from '../components/admin/waiterManagement/AddWaiter';
import EstablishmentsList from "../components/admin/EstablishmentsList";
import TopBar from "../components/TopBar";
import EditEstablishment from "../components/admin/establishmentManagement/EditEstablishment";
import UpdateEstablishment from "../components/admin/establishmentManagement/UpdateEstablishment";

export default function Routes() {
	return (
		<div>
			<Router>
				<TopBar />
				<Switch>
					<Route path="/addEstablishment" component={AddEstablishment} />
					<Route path="/updateEstablishment" component={UpdateEstablishment}/>
					<Route path="/addWaiter"  component={AddWaiter} />
					<Route path="/editEstablishment" component={EditEstablishment}/>
					<Route path="/login"  component={LoginForm} />
					<Route path="/" exact component={EstablishmentsList}/>
				</Switch>
			</Router>
		</div>
	)
}