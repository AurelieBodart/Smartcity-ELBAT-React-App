import React, {Component} from "react";
import {getAllEstablishments} from "../API";
import {Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class EstablishmentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            establishments : [],
            loadEstablishment : true
        }
    }

    // TODO je ne sais pas pourquoi mais il faut didMount et didUpdate sinon la liste ne s'actualise pas ...

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.loadEstablishment){
            getAllEstablishments()
                .then(result => {
                    if(prevState.establishment !== result)
                        this.setState({establishments : result});
                })
                .catch(e => {
                    console.log(e.message);
                    this.setState({error: true, errorMessage: e.message});

                });

            this.setState({loadEstablishment : false})
        }
    }

    componentDidMount() {
        getAllEstablishments()
            .then(result => {
                this.setState({establishments : result});
            })
            .catch(e => {
                console.log(e.message);
                this.setState({error: true, errorMessage: e.message});
            });
    }

    addEstablishmentToStore(item){
        return () => this.props.establishmentChosen(item);
    }

    render() {
        let Error = undefined;

        if (this.state.error !== undefined && this.state.error === true) {
            Error = <Typography color={"error"}>{this.state.errorMessage}</Typography>
        }

        return (
            <div>
                <Typography variant={"h3"} color={"secondary"}>Listing des établissements</Typography>

                    {this.state.establishments.map(item => {
                        return <Button
                            variant="contained"
                            color="secondary"
                            component={Link} to={"/editEstablishment"}
                            onClick={this.addEstablishmentToStore(item)}
                            key={item.name}
                            style={{margin: "10px", width: "250px", height: "60px"}}
                        >
                            {item.name}
                        </Button>
                    })}

                {Error && Error}

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        establishmentChosen : (establishment) => {
            dispatch({type : "establishment", payload : {establishmentInfo : establishment}});
        }
    }
}

export default connect(undefined,mapDispatchToProps)(EstablishmentsList);