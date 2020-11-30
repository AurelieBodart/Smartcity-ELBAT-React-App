import React, {Component} from "react";
import {getAllEstablishments} from "../API/http";
import {Button, Typography} from "@material-ui/core";

class EstablishmentsList extends Component {
    constructor() {
        super();
        this.state = {
            establishments : []
        }
    }

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

    render() {
        return (
            <div>
                <Typography variant={"h3"} color={"secondary"}>Listing des établissements</Typography>

                    {this.state.establishments.map(item => {
                        return <Button
                            variant="contained"
                            color="secondary"
                        >
                            <Typography color={"primary"}>{item.name}</Typography>
                        </Button>
                    })}

            </div>
        );
    }
}

export default EstablishmentsList;