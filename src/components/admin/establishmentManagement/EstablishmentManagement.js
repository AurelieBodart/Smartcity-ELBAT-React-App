import React, {Component} from 'react'
import {Typography, TextField, Grid, Paper, Button} from "@material-ui/core";

class EstablishmentManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : props.establishmentToUpdate?.name,
            phoneNumber : props.establishmentToUpdate?.phoneNumber,
            VATNumber : props.establishmentToUpdate?.VATNumber,
            email : props.establishmentToUpdate?.email,
            category : props.establishmentToUpdate?.category,
            street : props.establishmentToUpdate?.street,
            number : props.establishmentToUpdate?.number,
            country : props.establishmentToUpdate?.country,
            city : props.establishmentToUpdate?.city,
            postalCode : props.establishmentToUpdate?.postalCode,
            isSent : false,
            sentMessage : "",
            callback : props.callback
        }
    }

    sendInformation(){
        this.setState({isSent : true}, () => {
            if(this.state.isSent && this.allDefined(
                    this.state.name,
                    this.state.phoneNumber,
                    this.state.VATNumber,
                    this.state.email,
                    this.state.category,
                    this.state.street,
                    this.state.number,
                    this.state.country,
                    this.state.city,
                    this.state.postalCode))

                this.setState({
                    emptyField : false,
                    sentMessage : "Les informations de l'établissement sont enregistrées"},
                    () => {
                    this.state.callback(this.state);
                });
        });
    }

    allDefined = (...values) => values.every(value => value !== undefined && value !== "");

    render() {
        return (
            <div>
                <Typography
                    variant={"h4"}
                    color={"secondary"}
                    style={{marginBottom: "10px"}}
                >
                    Informations sur l'établissement
                </Typography>

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
                                <TextField
                                    type="text"
                                    color={"primary"}
                                    style={{minWidth: "300px", marginBottom: "10px", marginTop: "20px"}}
                                    label={"Nom de l'établissement"}
                                    variant="outlined"
                                    value={this.state.name}
                                    onChange={(event) =>
                                        this.setState({name : event.target.value})
                                    }
                                    error={this.state.isSent && (this.state.name === undefined || this.state.name === "")}
                                    helperText={this.state.isSent && (this.state.name === undefined || this.state.name === "") ? 'Champs vide !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    type="text"
                                    style={{minWidth: "300px", marginBottom: "10px"}}
                                    label={"Numéro de téléphone"}
                                    color={"primary"}
                                    variant="outlined"
                                    value={this.state.phoneNumber}
                                    onChange={(event) =>
                                        this.setState({phoneNumber : event.target.value})
                                    }
                                    error={this.state.isSent && (this.state.phoneNumber === undefined || this.state.phoneNumber === "")}
                                    helperText={this.state.isSent && (this.state.phoneNumber === undefined || this.state.phoneNumber === "") ? 'Champs vide !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    type="text"
                                    style={{minWidth: "300px", marginBottom: "10px"}}
                                    label={"Numéro de TVA"}
                                    color={"primary"}
                                    variant="outlined"
                                    value={this.state.VATNumber}
                                    onChange={(event) =>
                                        this.setState({VATNumber : event.target.value})
                                    }
                                    error={this.state.isSent && (this.state.VATNumber === undefined || this.state.VATNumber === "")}
                                    helperText={this.state.isSent && (this.state.VATNumber === undefined || this.state.VATNumber === "") ? 'Champs vide !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    type="text"
                                    style={{minWidth: "300px", marginBottom: "10px"}}
                                    label={"Email"}
                                    color={"primary"}
                                    variant="outlined"
                                    value={this.state.email}
                                    onChange={(event) =>
                                        this.setState({email : event.target.value})
                                    }
                                    error={this.state.isSent && (this.state.email === undefined || this.state.email === "")}
                                    helperText={this.state.isSent && (this.state.email === undefined || this.state.email === "") ? 'Champs vide !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    type="text"
                                    style={{minWidth: "300px", marginBottom: "10px"}}
                                    label={"Catégorie"}
                                    color={"primary"}
                                    variant="outlined"
                                    value={this.state.category}
                                    onChange={(event) =>
                                        this.setState({category : event.target.value})
                                    }
                                    error={this.state.isSent && (this.state.category === undefined || this.state.category === "")}
                                    helperText={this.state.isSent && (this.state.category === undefined || this.state.category === "") ? 'Champs vide !' : ''}
                                    required
                                />
                            </Grid>

                            <Typography variant={"h6"}>Adresse</Typography>

                            <Grid>
                                <TextField
                                    type="text"
                                    style={{minWidth: "300px", marginBottom: "10px"}}
                                    label={"Rue"}
                                    color={"primary"}
                                    variant="outlined"
                                    value={this.state.street}
                                    onChange={(event) =>
                                        this.setState({street : event.target.value})
                                    }
                                    error={this.state.isSent && (this.state.street === undefined || this.state.street === "")}
                                    helperText={this.state.isSent && (this.state.street === undefined || this.state.street === "") ? 'Champs vide !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    type="text"
                                    style={{minWidth: "300px", marginBottom: "10px"}}
                                    label={"Numero"}
                                    color={"primary"}
                                    variant="outlined"
                                    value={this.state.number}
                                    onChange={(event) =>
                                        this.setState({number : event.target.value})
                                    }
                                    error={this.state.isSent && (this.state.number === undefined || this.state.number === "")}
                                    helperText={this.state.isSent && (this.state.number === undefined || this.state.number === "") ? 'Champs vide !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    type="text"
                                    style={{minWidth: "300px", marginBottom: "10px"}}
                                    label={"Ville"}
                                    color={"primary"}
                                    variant="outlined"
                                    value={this.state.city}
                                    onChange={(event) =>
                                        this.setState({city : event.target.value})
                                    }
                                    error={this.state.isSent && (this.state.city === undefined || this.state.city === "")}
                                    helperText={this.state.isSent && (this.state.city === undefined || this.state.city === "") ? 'Champs vide !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    type="text"
                                    style={{minWidth: "300px", marginBottom: "10px"}}
                                    label={"Code postal"}
                                    color={"primary"}                                    variant="outlined"
                                    value={this.state.postalCode}
                                    onChange={(event) =>
                                        this.setState({postalCode : event.target.value})
                                    }
                                    error={this.state.isSent && (this.state.postalCode === undefined || this.state.postalCode === "")}
                                    helperText={this.state.isSent && (this.state.postalCode === undefined || this.state.postalCode === "") ? 'Champs vide !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    type="text"
                                    style={{minWidth: "300px", marginBottom: "10px"}}
                                    label={"Pays"}
                                    color={"primary"}                                    variant="outlined"
                                    value={this.state.country}
                                    onChange={(event) =>
                                        this.setState({country : event.target.value})
                                    }
                                    error={this.state.isSent && (this.state.country === undefined || this.state.country === "")}
                                    helperText={this.state.isSent && (this.state.country === undefined || this.state.country === "") ? 'Champs vide !' : ''}
                                    required
                                />
                            </Grid>
                            <Typography variant={"h6"} color={"primary"}>{this.state.sentMessage}</Typography>


                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => {this.sendInformation()}}
                            >
                                Confirmer les informations de l'établissement
                            </Button>
                        </Paper>
                    </Grid>
            </div>
        );
    }
}

export default EstablishmentManagement;