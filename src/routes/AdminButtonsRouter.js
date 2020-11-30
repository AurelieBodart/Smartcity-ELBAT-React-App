import React from "react";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import {Button, Grid} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

export default function adminButtonsRouter () {
    return (
        <div>
            <Grid container>
                <Grid>
                    <Button
                        startIcon={<BusinessIcon />}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        className="button-block"
                        component={Link} to={"/addEstablishment"}
                    >
                        Ajouter un établissement
                    </Button>
                </Grid>
                <Grid>
                    <Button
                        startIcon={<PersonAddIcon />}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        className="button-block"
                        component={Link} to={"/addWaiter"}
                    >
                        Ajouter un serveur
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}