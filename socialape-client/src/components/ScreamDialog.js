import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { globalTheme } from '../util/theme';

// Redux
import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';

// MUI 
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
 
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

const styles = theme => ({
    ...globalTheme,
    invisibleSeperator: {
        border: 'none',
        margin: 10
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    }
})


class ScreamDialog extends React.Component{
    state = {
        open: false
    }
    
    handleOpen = () => {
        this.setState({
            open: true
        })
        this.props.getScream(this.props.screamId)
    }
    handleClose = () => {
        this.setState({open: false});
    }

    render(){
        const {
                classes,
                scream: {
                    screamId, 
                    body,
                    createdAt,
                    likeCount,
                    commentCount,
                    userImage,
                    userHandle
                },
                UI:{
                    loading
                }
             } = this.props;

             const dialogMarkup = loading? (
                 <CircularProgress size={200} />
             ) : (
                 <Grid container spacing={16}>
                     <Grid item sm={5}>
                         <img src={userImage} alt="Profile" className={classes.profileImage}/>
                    </Grid>
                    <Grid item sm={7}>
                        <Typography
                            component={Link}
                            color="primary"
                            varaint="h5"
                            to={`/users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeperator} />
                        <Typography variant="body2" color='textSecondary'>
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeperator} />
                        <Typography variant="body1">
                            {body}
                        </Typography>
                     </Grid>
                 </Grid>
             );

             return (
                <Fragment>
                    <MyButton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
                        <UnfoldMore color='primary' />
                    </MyButton>
                    <Dialog
                        open={this.state.open}
                        fullWidth
                        maxWidth="sm"
                    >
                    <MyButton
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                    </Dialog>
                </Fragment>
            )
    }
} 


ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {
    getScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))