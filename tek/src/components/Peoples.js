import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShowPeople from './ShowPeople';
import ButtonAppBar from './ButtonAppBar';
import PostPeople from './PostPeople';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function generate(element) {
    return React.cloneElement(element, {
        key: 1,
    });
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,

        color: theme.palette.text.secondary,
    },
    modelPaper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
});

class Peoples extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPeopleId: '', open: false, dense: false,
            secondary: false
        }
    }

    clickHandler(id) {

        this.setState({ selectedPeopleId: id })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete(id) {
        this.props.dispatch({ type: 'DELETE_POST', id: id });
    }
    render() {

        const { classes } = this.props;
        const { dense, secondary } = this.state;
        return (
            <div className={classes.root}>
                <MuiThemeProvider>
                    < ButtonAppBar />
                    <Grid container spacing={8} style={{ marginTop: '5px' }}>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <h1>Peoples</h1>
                                <div className={classes.demo}>
                                    <List dense={dense}>
                                        {this.props.peoples.map((people) => {
                                            return (generate(
                                                <ListItem>

                                                    <ListItemText
                                                        primary={people.name}
                                                        secondary={secondary ? 'Secondary text' : null}
                                                        onClick={this.clickHandler.bind(this, people.id)}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton onClick={this.handleDelete.bind(this, people.id)}
                                                            aria-label="Delete" >
                                                            <DeleteIcon
                                                            />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>,
                                            ))
                                        })}
                                    </List>
                                </div>

                            </Paper>
                        </Grid>
                        <Grid item xs={7}>
                            <Paper className={classes.paper}>
                                {this.state.selectedPeopleId ? <ShowPeople id={this.state.selectedPeopleId} /> :
                                    <div > <h2> Select a person ! </h2> </div>}

                            </Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <Button onClick={this.handleOpen}>Add Person</Button>
                            </Paper>
                        </Grid>

                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            <div style={getModalStyle()} className={classes.modelPaper}>
                                <Typography variant="title" id="modal-title">
                                    Add a person
                                </Typography>
                                <PostPeople handleClose={this.handleClose} />
                            </div>
                        </Modal>

                    </Grid>
                </MuiThemeProvider>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        peoples: state
    }
}

Peoples.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Peoples));

