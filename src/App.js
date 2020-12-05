import './App.css';

import React from "react";
import { createMuiTheme, MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { Helmet } from "react-helmet";
import Routes from "./routes/Routes";

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
		},
		background: {
			default: "#373737",
			paper: "#bdbdbd"
		},
		error : {
			main : "#ab0b1b"
		},
	}
});

function App() {
	return (
		<div className="App">
			<Helmet>
				<title>ELBAT</title>
				<meta charSet="utf-8"/>
			</Helmet>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Routes />
			</MuiThemeProvider>
		</div>
	);
}

export default App;
