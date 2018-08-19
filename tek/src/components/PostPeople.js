
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const uuidv1 = require('uuid/v1');

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class PostPeople extends Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
        const name = this.getName.value;
        const rating = this.getRating.value;
        const img = this.getImg.value;
        const desc = this.getDesc.value;
        const likes = this.getLikes.value;
        const dislikes = this.getDislikes.value;
        const likesArr = likes.split(",");
        const dislikesArr = dislikes.split(",");

        const data = {
            id: uuidv1(),
            name,
            rating,
            img,
            Description: desc,
            Likes: likesArr,
            Dislikes: dislikesArr,
        }
        this.props.dispatch({
            type: 'ADD_POST',
            data
        });
        this.getName.value = '';
        this.getRating.value = '';
        this.getDesc.value = '';
        this.getLikes.value = '';
        this.getDislikes.value = '';
        this.props.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <form onSubmit={this.handleSubmit}
                >
                    <input required type="text" ref={(input) => this.getName = input}
                        placeholder="Name" />
                    <br /><br />
                    <input required type="text" ref={(input) => this.getRating = input}
                        placeholder="Rating" />
                    <br /><br />
                    <input required type="text" value='http://www.fillmurray.com/200/200'
                        ref={(input) => this.getImg = input}
                        placeholder="Image" />
                    <br /><br />
                    <input required type="text" ref={(input) => this.getDesc = input}
                        placeholder="Description" />
                    <br /><br />
                    <input required type="text" ref={(input) => this.getLikes = input}
                        placeholder="Likes" />
                    <br /><br />
                    <input required type="text" ref={(input) => this.getDislikes = input}
                        placeholder="Dislikes" />
                    <br /><br />
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}
                        className={classes.button}>
                        ADD
                     </Button>
                </form>
            </div>
        );
    }
}

PostPeople.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(PostPeople));