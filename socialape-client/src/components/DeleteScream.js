import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

// Redux
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogAction from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '92%',
        top: '32%'
    }
}

class DeleteScream extends React.Component{
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    deleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.handleClose()
    }


    render(){

        const { classes } = this.props;
        return(
            <Fragment>
                <MyButton tip="Delete post"
                            onClick={this.handleOpen}
                            btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color='secondary' />
                </MyButton>
                <Dialog open={this.state.open}
                        onClose={this.handleClose}
                        fullWidth
                        maxWidth="sm"
                >
                    <DialogTitle>
                        Are you sure you want to delete this post ?
                    </DialogTitle>
                    <DialogAction>
                        <Button onClick={this.handleClose} color='primary'>Close</Button>
                    </DialogAction>
                    <DialogAction >
                        <Button onClick={this.deleteScream} color='secondary'>Delete</Button>
                    </DialogAction>
                </Dialog>
                
            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, {deleteScream})(withStyles(styles)(DeleteScream))