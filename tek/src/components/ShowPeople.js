import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const styles = {
    row: {
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },

    label: {
        color: 'blue'
    }
};

class ShowPeople extends Component {
  
    render() {

        const { classes } = this.props;
        const peoples = this.props.peoples.filter((people) => people.id === this.props.id)

        return <div>
            <h2>Person Details:</h2>
            {peoples.map((people) => {
                return (<div key={people.id} className={classes.row}>

                    <Avatar
                        alt="Avatar"
                        src={people.img}
                        className={classNames(classes.avatar, classes.bigAvatar)}
                    />
                    <Typography variant="body2" gutterBottom>

                        <span className={classes.label}> Name:</span> {people.name}
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        <span className={classes.label}>  Rating: </span> {people.rating}
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        <span className={classes.label}>  Description:</span> {people.Description}
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        <span className={classes.label}>  Likes: </span>  {people.Likes.join()}
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        <span className={classes.label}>  Dislikes: </span> {people.Dislikes.join()}
                    </Typography>

                </div>);
            })}

        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        peoples: state
    }
}

ShowPeople.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ShowPeople));