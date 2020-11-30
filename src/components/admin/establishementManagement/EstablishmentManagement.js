import React, {Component} from 'react'
import {Typography, TextField, Grid, Paper, Button} from "@material-ui/core";

class EstablishmentManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            phoneNumber : "",
            VATNumber : "",
            email : "",
            category : "",
            street : "",
            number : "",
            country : "",
            city : "",
            postalCode : "",
            isSend : false,
            callback : props.callback
        }
    }

    // componentDidUpdate(nextProps, nextState, nextContext) {
    //     this.state.callback(this.state);
    //     console.log("componentDidUpdate");
    //     console.log(this.state.establishment);
    // }

    render() {
        return (
            <div>
                <Typography variant={"h3"} color={"secondary"}>Informations sur l'établissement</Typography>

                    <Grid container
                        direction={"column"}
                        justify={"center"}
                        alignItems={"center"}>

                        <Paper
                            className="establishment-form"
                            variant="elevation"
                            elevation={2}
                        >
                            <Grid>
                                <Typography>Nom de l'établissement : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    onChange={(event) =>
                                        this.setState({name : event.target.value})
                                    }
                                    error={this.state.isSend && this.state.name === ""}
                                    helperText={this.state.isSend && this.state.name === "" ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Numéro de téléphone : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    onChange={(event) =>
                                        this.setState({phoneNumber : event.target.value})
                                    }
                                    error={this.state.isSend && this.state.phoneNumber === ""}
                                    helperText={this.state.isSend && this.state.phoneNumber === "" ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Numéro de TVA : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    onChange={(event) =>
                                        this.setState({VATNumber : event.target.value})
                                    }
                                    error={this.state.isSend && this.state.VATNumber === ""}
                                    helperText={this.state.isSend && this.state.VATNumber === "" ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Email : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    onChange={(event) =>
                                        this.setState({email : event.target.value})
                                    }
                                    error={this.state.isSend && this.state.email === ""}
                                    helperText={this.state.isSend && this.state.email === "" ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Catégorie : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    onChange={(event) =>
                                        this.setState({category : event.target.value})
                                    }
                                    error={this.state.isSend && this.state.category === ""}
                                    helperText={this.state.isSend && this.state.category === "" ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Typography variant={"h6"}>Adresse</Typography>
                            <Grid>
                                <Typography>Rue : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    onChange={(event) =>
                                        this.setState({street : event.target.value})
                                    }
                                    error={this.state.isSend && this.state.street === ""}
                                    helperText={this.state.isSend && this.state.street === "" ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Numéro : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    onChange={(event) =>
                                        this.setState({number : event.target.value})
                                    }
                                    error={this.state.isSend && this.state.number === ""}
                                    helperText={this.state.isSend && this.state.number === "" ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Ville : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    onChange={(event) =>
                                        this.setState({city : event.target.value})
                                    }
                                    error={this.state.isSend && this.state.city === ""}
                                    helperText={this.state.isSend && this.state.city === "" ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Code postal : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    onChange={(event) =>
                                        this.setState({postalCode : event.target.value})
                                    }
                                    error={this.state.isSend && this.state.postalCode === ""}
                                    helperText={this.state.isSend && this.state.postalCode === "" ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Pays : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    onChange={(event) =>
                                        this.setState({country : event.target.value})
                                    }
                                    error={this.state.isSend && this.state.country === ""}
                                    helperText={this.state.isSend && this.state.country === "" ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={(event) => {this.state.callback(this.state)}}
                            >
                                OK
                            </Button>
                        </Paper>
                    </Grid>
            </div>
        );
    }
}

export default EstablishmentManagement;