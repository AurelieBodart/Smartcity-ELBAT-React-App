import React from "react";
import {
    Button,
    ButtonGroup,
    Grid,
    Paper,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LoginIcon from "@material-ui/icons/AccountCircle";
import { getAllEstablishments } from "../../API"
import AlreadyRegisteredUser from "./AlreadyRegisteredUser";
import NewWaiter from "./NewWaiter";

export default class AddWaiter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: undefined,
            establishments: undefined
        }
    }

    getEstablishments() {
        if (this.state.establishments === undefined) {
            getAllEstablishments().then(values => {
                this.setState({establishments: [...values]});
            }).catch(e => {
                window.alert(e);
            });
        }
    }

    render() {
        let Content;

        if (this.state.form !== undefined) {
            Content = (this.state.form === "newUser") ? <NewWaiter establishments={this.state.establishments} /> :
                <AlreadyRegisteredUser establishments={this.state.establishments} />
        }

        return (
            <Grid container>
                <Grid item style={{padding: "20px"}}>
                    <Paper
                        className="table-form"
                        variant="elevation"
                        elevation={2}
                        style={{marginTop: "20px"}}
                    >
                        <ButtonGroup style={{height: "100%", width: "100%", padding: "40px"}} orientation={"vertical"}>
                            <Button
                                startIcon={<PersonAddIcon />}
                                variant={"contained"}
                                color="primary"
                                onClick={() => {
                                    this.setState({form: "newUser"});
                                    this.getEstablishments();
                                }}
                            >Nouvel utilisateur</Button>
                            <Button
                                startIcon={<LoginIcon/>}
                                variant={"contained"}
                                color="primary"
                                onClick={() => {
                                    this.setState({form: "alreadyRegistered"});
                                    this.getEstablishments();
                                }}
                            >Utilisateur déjà enregistré</Button>
                        </ButtonGroup>
                    </Paper>
                </Grid>
                <Grid item style={{flex: "auto"}}>
                    <Paper
                        style={{margin: "20px", flex: "auto"}}
                    >
                        {Content && Content}
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}