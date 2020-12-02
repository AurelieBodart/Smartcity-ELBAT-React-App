import React from 'react';
import EstablishmentManagement from './EstablishmentManagement';
import TableManagement from './TableManagement';
import {Button} from "@material-ui/core";
import { postEstablishment } from "../../API";
import { postTable } from "../../API";
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

            },
            tables : []
        }
    }

    loadEstablishment(establishment){
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

    loadTables(tables){
        this.setState({tables : tables});
    }

    async addEstablishment() {
        try {
            const idEstablishment = await postEstablishment(this.state.establishment);
            console.log("id estab");
            console.log(idEstablishment);

            for(let table of this.state.tables){
                console.log("table à ajouter");
                console.log(table);
                await postTable(table, idEstablishment);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    render() {
        return (
            <div>
                <div className={"cadre"}>
                    <EstablishmentManagement callback={(establishment) => this.loadEstablishment(establishment)}/>
                    <TableManagement callback={(tables) => this.loadTables(tables)}/>
                </div>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.addEstablishment()}
                    component={Link} to={"/"}
                >Confirmer l'ajout du restaurant</Button>
            </div>
        );
    }
}

