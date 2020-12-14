import React, {Component} from 'react'
import {Button, ButtonGroup, Paper, Typography} from "@material-ui/core";
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

        let confirmation = window.confirm("Souhaitez-vous supprimer ce restaurant ?");

        if(confirmation){
            try {
                await deleteEstablishment(this.state.establishment.id);
            } catch (e) {
                this.setState({error : e.message});
            }
        }
    }

    render() {
        return (
            <Paper
                className="table-form"
                variant="elevation"
                elevation={2}
            >
                <Typography variant={"h4"} color={"primary"}>{this.state.establishment.name}</Typography>
                <ButtonGroup orientation={"vertical"} style={{marginBottom: "20px"}}>
                    <Button color="primary"
                            variant="contained"
                            component={Link} to={"/updateEstablishment"}
                    >
                        Modifier l'établissement
                    </Button>

                    <Button color="primary"
                            variant="contained"
                            onClick={() => this.deleteChosenEstablishment()}
                            component={Link} to={"/"}
                    >
                        Supprimer l'établissement
                    </Button>


                    <Button color="primary"
                            variant="contained"
                            component={Link} to={"/editEmployees"}
                    >
                        Gérer les employés
                    </Button>
                </ButtonGroup>
                <Typography color={"error"}>{this.state.error}</Typography>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        establishmentStore : state.establishmentChosen.establishmentStore
    }
}

export default connect(mapStateToProps, undefined) (EditEstablishment);