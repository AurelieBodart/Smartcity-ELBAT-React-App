import React from "react";
import {
    Link
} from "react-router-dom";
import {Button, ButtonGroup, Grid} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

export default function adminButtonsRouter () {
    return (
        <div>
            <Grid container>
                <ButtonGroup color="secondary" variant="contained">
                    <Button
                        startIcon={<BusinessIcon />}
                        type="submit"
                        component={Link} to={"/addEstablishment"}
                    >
                        Ajouter un établissement
                    </Button>
                    <Button
                        startIcon={<PersonAddIcon />}
                        type="submit"
                        component={Link} to={"/addWaiter"}
                    >
                        Ajouter un serveur
                    </Button>
                </ButtonGroup>
            </Grid>
        </div>
    )
}