import React from "react";
import {AppBar, Grid, Toolbar, Typography} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";

class TopBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<AppBar position="fixed" alignitems="center" color="primary">
					<Toolbar>
						<Grid item style={{flex: "auto"}}>
							<Typography variant="h6">ELBAT</Typography>
						</Grid>
						<Grid
							item
							alignitems="center"
						>
							<AccountCircle
								style={{
									position: "relative", top: "4px"
								}}
							/>
							<Typography
								style={{ display: "inline", paddingLeft: "10pt", paddingBottom: "5pt", margin: "auto" }}
								variant="h6"
							>
								User
							</Typography>
						</Grid>
					</Toolbar>
				</AppBar>
		);
	}
}

export default TopBar;