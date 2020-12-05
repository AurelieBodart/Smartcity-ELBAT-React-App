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
            isSend : false,
            sentMessage : "",
            callback : props.callback
        }
    }

    sentInformations(){
        this.setState({isSend : true}, () => {
            if(this.state.isSend && this.allDefined(
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
                <Typography variant={"h4"} color={"secondary"}>Informations sur l'établissement</Typography>
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
                                    value={this.state.name}
                                    onChange={(event) =>
                                        this.setState({name : event.target.value})
                                    }
                                    error={this.state.isSend && (this.state.name === undefined || this.state.name === "")}
                                    helperText={this.state.isSend && (this.state.name === undefined || this.state.name === "") ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Numéro de téléphone : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    value={this.state.phoneNumber}
                                    onChange={(event) =>
                                        this.setState({phoneNumber : event.target.value})
                                    }
                                    error={this.state.isSend && (this.state.phoneNumber === undefined || this.state.phoneNumber === "")}
                                    helperText={this.state.isSend && (this.state.phoneNumber === undefined || this.state.phoneNumber === "") ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Numéro de TVA : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    value={this.state.VATNumber}
                                    onChange={(event) =>
                                        this.setState({VATNumber : event.target.value})
                                    }
                                    error={this.state.isSend && (this.state.VATNumber === undefined || this.state.VATNumber === "")}
                                    helperText={this.state.isSend && (this.state.VATNumber === undefined || this.state.VATNumber === "") ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Email : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    value={this.state.email}
                                    onChange={(event) =>
                                        this.setState({email : event.target.value})
                                    }
                                    error={this.state.isSend && (this.state.email === undefined || this.state.email === "")}
                                    helperText={this.state.isSend && (this.state.email === undefined || this.state.email === "") ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Catégorie : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    value={this.state.category}
                                    onChange={(event) =>
                                        this.setState({category : event.target.value})
                                    }
                                    error={this.state.isSend && (this.state.category === undefined || this.state.category === "")}
                                    helperText={this.state.isSend && (this.state.category === undefined || this.state.category === "") ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>

                            <Typography variant={"h5"}>Adresse</Typography>

                            <Grid>
                                <Typography>Rue : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    value={this.state.street}
                                    onChange={(event) =>
                                        this.setState({street : event.target.value})
                                    }
                                    error={this.state.isSend && (this.state.street === undefined || this.state.street === "")}
                                    helperText={this.state.isSend && (this.state.street === undefined || this.state.street === "") ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Numéro : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    value={this.state.number}
                                    onChange={(event) =>
                                        this.setState({number : event.target.value})
                                    }
                                    error={this.state.isSend && (this.state.number === undefined || this.state.number === "")}
                                    helperText={this.state.isSend && (this.state.number === undefined || this.state.number === "") ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Ville : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    value={this.state.city}
                                    onChange={(event) =>
                                        this.setState({city : event.target.value})
                                    }
                                    error={this.state.isSend && (this.state.city === undefined || this.state.city === "")}
                                    helperText={this.state.isSend && (this.state.city === undefined || this.state.city === "") ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Code postal : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    value={this.state.postalCode}
                                    onChange={(event) =>
                                        this.setState({postalCode : event.target.value})
                                    }
                                    error={this.state.isSend && (this.state.postalCode === undefined || this.state.postalCode === "")}
                                    helperText={this.state.isSend && (this.state.postalCode === undefined || this.state.postalCode === "") ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Grid>
                                <Typography>Pays : </Typography>
                                <TextField
                                    type="text"
                                    color={"secondary"}
                                    variant="outlined"
                                    value={this.state.country}
                                    onChange={(event) =>
                                        this.setState({country : event.target.value})
                                    }
                                    error={this.state.isSend && (this.state.country === undefined || this.state.country === "")}
                                    helperText={this.state.isSend && (this.state.country === undefined || this.state.country === "") ? 'Empty field !' : ''}
                                    required
                                />
                            </Grid>
                            <Typography variant={"h6"} color={"secondary"}>{this.state.sentMessage}</Typography>


                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => {this.sentInformations()}}
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