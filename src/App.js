import './App.css';

import LoginScreen from "./components/LoginScreen";
import TopBar from "./components/TopBar";
import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { Helmet } from "react-helmet";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#0c213d",
			light: "#384868",
			dark: "#000018",
			contrastText: "#ffffff"
		},
		secondary: {
			main: "#e0e0e0",
			light: "#ffffff",
			dark: "#aeaeae",
			contrastText: "#000000"
		}
	}
});

function App() {
	return (
		<div>
			<Helmet>
				<title>ELBAT</title>
				<meta charSet="utf-8"/>
			</Helmet>
			<MuiThemeProvider theme={theme}>
				<TopBar />
				<LoginScreen />
			</MuiThemeProvider>
		</div>
	);
}

export default App;
