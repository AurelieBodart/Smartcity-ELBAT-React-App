import React from 'react';
import EstablishmentManagement from './EstablishmentManagement';
import TableManagement from './TableManagement';
import {Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { getAllTables, deleteTable, postTable, patchEstablishment } from "../../API";

class UpdateEstablishment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            establishment: props.establishmentStore,
            tablesBeforeUpdate: [],
            tablesAfterUpdate : [],
            emptyField : true
        }
    }

    componentDidMount() {
        getAllTables(this.props.establishmentStore.id)
            .then(response => this.setState({tablesBeforeUpdate : response}))
            .catch(e => {
                this.setState({error: true, errorMessage: e.message});
            });
    }

    loadEstablishment(establishment){
        this.setState({
            establishment : {
                id : this.props.establishmentStore.id,
                name : establishment.name,
                phoneNumber : establishment.phoneNumber,
                VATNumber : establishment.VATNumber,
                email : establishment.email,
                category : establishment.category,
                addressId : this.props.establishmentStore.addressId,
                street : establishment.street,
                number : establishment.number,
                country : establishment.country,
                city : establishment.city,
                postalCode : establishment.postalCode
            },
            emptyField : establishment.emptyField
        });
    }


    loadTablesAfterUpdate(tables){
        this.setState({tablesAfterUpdate : tables});
    }

    async updateEstablishment(){
        if(!this.state.emptyField) {
            let tablesToDelete = this.state.tablesBeforeUpdate.filter(table => !this.state.tablesAfterUpdate.includes(table));
            let tablesToAdd = this.state.tablesAfterUpdate.filter(table => !this.state.tablesBeforeUpdate.includes(table));

            try {
                await patchEstablishment(this.state.establishment)

                for(let table of tablesToDelete)
                    await deleteTable(table.id, this.state.establishment.id);

                for(let table of tablesToAdd)
                    await postTable(table, this.state.establishment.id);

            } catch (e) {
                this.setState({error: true, errorMessage: e.message});
            }
        }
    }

    render(){

        let Error = undefined;

        if (this.state.error !== undefined && this.state.error === true) {
            Error = <Typography color={"error"}>{this.state.errorMessage}</Typography>
        }

        return(
            <div>
                <Typography
                    variant={"h2"}
                    color={"secondary"}
                    style={{marginBottom: "30px", marginTop: "20px"}}
                >
                    Mise à jour : {this.state.establishment.name}
                </Typography>


                <div className={"cadre"}>
                    <EstablishmentManagement
                        establishmentToUpdate={this.state.establishment}
                        callback={(establishment) => this.loadEstablishment(establishment)}
                    />

                    <TableManagement
                        tablesToUpdate={this.state.tablesBeforeUpdate}
                        callback={(tables) => this.loadTablesAfterUpdate(tables)}
                    />
                </div>

                <Typography color={"error"}>{this.state.error}</Typography>

                {Error && Error}

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.updateEstablishment()}
                    component={Link} to={"/"}
                >
                    Confirmer la modification du restaurant
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        establishmentStore : state.establishmentChosen.establishmentStore
    }
}

export default connect(mapStateToProps, undefined) (UpdateEstablishment);
