import React, {Component} from 'react'
import {Button, Grid, Paper, Typography} from "@material-ui/core";

class TableManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables : [],
            inputNbSeats : "",
            inputIsOutside : ""
        }
    }

    addTable(){
        const previousTables = this.state.tables;
        previousTables.push({nbSeats : this.state.inputNbSeats, isOutside : this.state.inputIsOutside})
        console.log("add table");
        console.log(this.state.inputIsOutside);
        console.log(previousTables);
        this.setState({tables : previousTables, inputNbSeats : "", inputIsOutside : ""}, () => {
            document.getElementById("nbSeats").value = '';
            document.getElementById("isOutside").checked = false;
        });

    }

    render() {
        return (
            <div>
                <Typography variant={"h3"} color={"secondary"}>Gestion des tables</Typography>
                <Typography variant={"h5"} color={"secondary"}>Tables présentes</Typography>
                <Paper
                    className="table-form"
                    variant="elevation"
                    elevation={2}
                >
                    <table>
                        <tr>
                            <th>Nombre de places</th>
                            <th>En extérieur</th>
                            <th>Supprimer la ligne</th>
                        </tr>
                        {this.state.tables.map(item => {
                            return (
                                <tr>
                                    <td>{item.nbSeats}</td>
                                    <td>{item.isOutside ? "extérieur": "intérieur"}</td>
                                    <td><Button>X</Button></td>
                                </tr>
                            )
                        })}

                    </table>
                </Paper>

                <Typography variant={"h5"} color={"secondary"}>Ajouter des tables</Typography>
                <Paper
                    className="table-form"
                    variant="elevation"
                    elevation={2}
                >
                    <Grid container>
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
                    <button onClick={(event) => this.addTable()}>Ajouter la table</button>
                </Paper>
            </div>
        );
    }
}

export default TableManagement;