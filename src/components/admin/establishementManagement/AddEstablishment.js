import React from 'react';
import EstablishmentManagement from './EstablishmentManagement';
import TableManagement from './TableManagement';
import {Button} from "@material-ui/core";


export default class AddEstablishment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("add Establishment render");
        return (
            <div>
                <EstablishmentManagement/>
                <TableManagement/>
                <Button>Confirmer l'ajout du restaurant</Button>
            </div>
        );
    }
}

