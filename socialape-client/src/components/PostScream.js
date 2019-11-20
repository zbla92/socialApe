import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';

// Redux
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    
}

class PostScream extends React.Component{
    render(){
        return(
            <div> a</div>
        )
    }
}

export default connect(mapStateToProps, { postScream })(withStyles(styles)(PostScream));