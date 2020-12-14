import React from 'react';
import EstablishmentManagement from './EstablishmentManagement';
import TableManagement from './TableManagement';
import {Button, Typography} from "@material-ui/core";
import { postEstablishment, postTable } from "../../API";
import {Link} from "react-router-dom";

export default class AddEstablishment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            establishment : {},
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

            if(idEstablishment !== undefined) { // TODO undefined ou null ?
                for (let table of this.state.tables)
                    await postTable(table, idEstablishment);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    render() {
        return (
            <div>
                <Typography variant={"h1"} color={"secondary"}>Ajout d'un établissement</Typography>

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

