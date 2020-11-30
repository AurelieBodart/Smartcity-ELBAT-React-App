import React, {Component} from 'react'
import {Typography} from "@material-ui/core";

class EstablishmentManagement extends Component {
    constructor() {
        super();
        this.state = {
            nom : "",
            mail : "",
            category : "",
            VAT : "",
            phone : "",
            street : "",
            number : "",
            postalCode : "",
            locality : "",
            country : ""
        }
    }

    render() {
        return (
            <div>
                <Typography variant={"h3"} color={"secondary"}>Informations générales sur l'établissement</Typography>


            </div>
        );
    }
}

export default EstablishmentManagement;