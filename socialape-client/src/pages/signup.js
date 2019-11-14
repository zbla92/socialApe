import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import {Link} from 'react-router-dom'

// Redux
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typeography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField' 
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';



const styles = theme => ({
    ...theme.spreadThis
})

class signup extends React.Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: ''
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })            
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history)
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const { classes, loading } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="logo" className={classes.image}/>
                    <Typeography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typeography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField  id="email"
                                    name="email" 
                                    type='email' 
                                    label="Email" 
                                    className={classes.textField}
                                    helperText={errors.email}
                                    error={errors.handle ? true : false}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    fullWidth
                        />
                        <TextField  id="password"
                                    name="password" 
                                    type='password' 
                                    label="Password" 
                                    className={classes.textField}
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    fullWidth
                        />
                        <TextField  id="confirmPassword"
                                    name="confirmPassword" 
                                    type='password' 
                                    label="Confirm Password" 
                                    className={classes.textField}
                                    helperText={errors.confirmPassword}
                                    error={errors.confirmPassword ? true : false}
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                    fullWidth
                        />
                        <TextField  id="handle"
                                    name="handle" 
                                    type='text' 
                                    label="Handle" 
                                    className={classes.textField}
                                    helperText={errors.handle}
                                    error={errors.email ? true : false}
                                    value={this.state.handle}
                                    onChange={this.handleChange}
                                    fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" disabled={loading} className={classes.button}>Signup {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )} </Button>
                        <br/>
                        <small>already have an account ? log in <Link to={'/login'}>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));