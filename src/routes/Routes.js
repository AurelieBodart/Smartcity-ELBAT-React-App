import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import LoginForm from "../components/LoginScreen";
import TopBar from "../components/TopBar";

export default function Routes() {
	return (
		<div>
			<TopBar />
			<Router>
				<Switch>
					<Route path="/login" component={LoginForm} />
					<Route path="/" render={() => {
						return localStorage.getItem("user") !== null ?
							<Redirect to="/panel"/> : <Redirect to="/login"/>
					}} />
				</Switch>
			</Router>
		</div>
	)
}