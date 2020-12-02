import React, {Component} from "react";
import {getAllEstablishments} from "../API";
import {Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class EstablishmentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            establishments : []
        }
    }

    // TODO changer pour comparer au prevState
    componentDidMount() {
        try {
            getAllEstablishments(this.state.establishments).then(result => {
                console.log("result getAllEstablishment");
                console.log(result);

                this.setState({establishments : result.data});
            })
        } catch (e) {
            console.log(e.message);
        }
    }

    addEstablishementToStore(item){
        return () => this.props.establishmentToEdit(item);
    }

    render() {
        return (
            <div>
                <Typography variant={"h3"} color={"secondary"}>Listing des établissements</Typography>

                    {this.state.establishments.map(item => {
                        return <Button
                            variant="contained"
                            color="secondary"
                            component={Link} to={"/editEstablishment"}
                            onClick={this.addEstablishementToStore(item)}
                        >
                            <Typography color={"primary"}>{item.name}</Typography>
                        </Button>
                    })}

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        establishmentToEdit : (establishment) => {
            dispatch({type : "establishmentToEdit", payload : {establishmentInfo : establishment}});
        }
    }
}

export default connect(undefined,mapDispatchToProps)(EstablishmentsList);