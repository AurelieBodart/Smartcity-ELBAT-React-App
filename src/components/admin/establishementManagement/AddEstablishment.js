import React from 'react';
import EstablishmentManagement from './EstablishmentManagement';
import TableManagement from './TableManagement';
import {Button} from "@material-ui/core";
import { postEstablishment } from "../../API";
import {Link} from "react-router-dom";

export default class AddEstablishment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            establishment : {
                name : "",
                phoneNumber : "",
                VATNumber : "",
                email : "",
                category : "",
                street : "",
                number : "",
                country : "",
                city : "",
                postalCode : ""

            }
        }
    }

    loadEstablishement(establishment){
        this.setState({
            establishment : {
                name : establishment.name,
                phoneNumber : establishment.phoneNumber,
                VATNumber : establishment.VATNumber,
                email : establishment.email,
                category : establishment.category,
                street : establishment.street,
                number : establishment.number,
                country : establishment.country,
                city : establishment.city,
                postalCode : establishment.postalCode
            }
        });
    }

    async addEstablishment() {
        try {
            const response = await postEstablishment(this.state.establishment);
            console.log("réponse dans le bouton ajout restau");
            console.log(response)

        } catch (e) {
            console.log(e.message);
        }

    }

    render() {
        return (
            <div>
                <div className={"cadre"}>
                    <EstablishmentManagement callback={(establishment) => this.loadEstablishement(establishment)}/>
                    <TableManagement/>
                </div>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={event => this.addEstablishment()}
                    component={Link} to={"/"}
                >Confirmer l'ajout du restaurant</Button>
            </div>
        );
    }
}

