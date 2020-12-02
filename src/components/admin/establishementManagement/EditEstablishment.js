import React, {Component} from 'react'
import {Button, Paper, Typography} from "@material-ui/core";
import { connect } from "react-redux";
import { deleteEstablishment } from "../../API";
import {Link} from "react-router-dom";

class EditEstablishment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            establishment : props.establishmentStore,
            error : ""
        }
    }

    async deleteChosenEstablishment() {
        this.setState({error : ""});

        // demande confirmation

        try {
            const response = await deleteEstablishment(this.state.establishment.id);
        } catch (e) {
            this.setState({error : e.message});
        }
    }

    render() {
        console.log("render");
        console.log(this.state);

        return (
            <Paper
                className="table-form"
                variant="elevation"
                elevation={2}
            >
                <div style={{ height: 500, width: '100%' }} >
                    <Typography variant={"h4"} color={"secondary"}>{this.state.establishment.name}</Typography>

                    <Button color="primary"
                            variant="contained"
                    >
                        Modifier l'établissement
                    </Button>

                    <Button color="primary"
                            variant="contained"
                            onClick={event => this.deleteChosenEstablishment()}
                            component={Link} to={"/"}
                    >
                        Supprimer l'établissement
                    </Button>


                    <Button color="primary"
                            variant="contained"
                    >
                        Gérer les employés
                    </Button>
                    <Typography color={"error"}>{this.state.error}</Typography>
                </div>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        establishmentStore : state.establishementToEdit.establishmentStore
    }
}

export default connect(mapStateToProps, undefined) (EditEstablishment);