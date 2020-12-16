import React, {Component} from 'react'
import {Button, Grid, Paper, Typography} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';

class TableManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables : [],
            id : 1,
            inputNbTables : "",
            inputNbSeats : "",
            inputIsOutside : false,
            error : "",
            sentMessage : "",
            callback : props.callback,
            isCreation: true
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.tablesToUpdate !== undefined && this.state.tables.length === 0 && this.state.isCreation) {
            this.setState({
                tables : [...this.props.tablesToUpdate],
                id : this.props?.tablesToUpdate[this.props?.tablesToUpdate?.length - 1]?.id + 1,
                isCreation : false
            });
        }
    }

    addTable() {
        if (this.state.inputNbTables === "" || this.state.inputNbTables === "0") {
            this.setState({error: "Le nombre de tables est obligatoire et doit être différent de 0"});
        } else {
            if (this.state.inputNbSeats === "" || (parseInt(this.state.inputNbSeats) <= 0 || parseInt(this.state.inputNbSeats) > 8)) {
                this.setState({error: "Le nombre de siège est obligatoire et doit être compris entre 1 et 8"});
            } else {
                const previousTables = [...this.state.tables];

                let i;
                for (i = 0; i < parseInt(this.state.inputNbTables); i++) {
                    previousTables.push({
                        id: this.state.id + i,
                        nbSeats: parseInt(this.state.inputNbSeats),
                        isOutside: this.state.inputIsOutside
                    });
                }

                this.setState({
                        tables: previousTables,
                        id: this.state.id + i,
                        error : "",
                        inputNbTables: "",
                        inputNbSeats: "",
                        inputIsOutside: false,
                    },
                    () => {
                        document.getElementById("nbTables").value = '';
                        document.getElementById("nbSeats").value = '';
                        document.getElementById("isOutside").checked = false;
                    });
            }
        }
    }

    deleteTable(event){
        const newTables = this.state.tables.filter(table => table.id !== event.data.id);
        this.setState({tables : newTables});
    }

    sentTables() {
        this.setState({sentMessage : "Les tables de l'établissement sont enregistrées"}, () => {
            this.state.callback(this.state.tables)
        })
    }

    render() {
        const columns = [
            { field: 'nbSeats', headerName: 'Nombre de places', width: 200 },
            { field: 'isOutside', headerName: 'En extérieur', width: 150 }
        ];

        return (
            <div>
                <Typography
                    variant={"h4"}
                    color={"secondary"}
                    style={{marginBottom: "10px"}}
                >
                    Gestion des tables
                </Typography>

                <Typography variant={"h5"} color={"secondary"}>Tables présentes</Typography>
                <Paper
                    className="table-form"
                    variant="elevation"
                    elevation={2}
                >
                    <Typography variant={"h5"} color={"primary"}>Cochez une table pour la supprimer</Typography>

                    <div style={{ height: 450, width: '100%' }}>
                        <DataGrid
                            rows={this.state.tables}
                            columns={columns}
                            showColumnRightBorder={true}
                            hideFooter={true}
                            checkboxSelection={true}
                            onRowSelected={event => this.deleteTable(event)}
                        />
                    </div>
                </Paper>

                <Typography variant={"h5"} color={"secondary"}>Ajouter des tables</Typography>
                <Paper
                    className="table-form"
                    variant="elevation"
                    elevation={2}
                >
                    <Grid container
                          direction={"column"}
                    >
                        <Grid>
                            <Typography>Nombre de tables :</Typography>
                            <input
                                id="nbTables"
                                type="text"
                                onChange={(event) => {
                                    this.setState({inputNbTables: event.target.value});
                                }}/>
                        </Grid>
                        <Grid>
                            <Typography>Nombre de sièges :</Typography>
                            <input
                                id="nbSeats"
                                type="text"
                                onChange={(event) => {
                                       this.setState({inputNbSeats: event.target.value});
                                }}/>
                        </Grid>
                        <Grid>
                            <Typography>En extérieur ?</Typography>
                            <input
                                id="isOutside"
                                type="checkbox"
                               onChange={(event) => {
                                   this.setState({inputIsOutside: event.target.checked});
                               }}/>
                        </Grid>
                    </Grid>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => this.addTable()}>Ajouter la table</Button>
                    <Grid>
                        <Typography color={"error"}>{this.state.error}</Typography>
                        <Typography variant={"h6"} color={"primary"}>{this.state.sentMessage}</Typography>

                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {this.sentTables()}}
                        >
                            Confirmer l'ajout des tables
                        </Button>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default TableManagement;