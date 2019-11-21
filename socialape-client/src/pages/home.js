import React from 'react';
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

// Redux
import { connect } from 'react-redux'
import { getScreams } from '../redux/actions/dataActions'


import Scream from '../components/Scream.js'
import Profile from '../components/Profile.js'

class home extends React.Component{
   state = {
       screams: null
   }
    componentDidMount(){
        this.props.getScreams();
   }
   

    render(){
        const { screams, loading } = this.props.data
        let recentScreamsMarkup = !loading ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
        ) : <p>loading ...</p>

        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
} 

home.propTypes = {
    data: PropTypes.object.isRequired,
    getScreams: PropTypes.func.isRequired
}

const mapActionsToProps = {
    getScreams
}

const mapStateToProps = (state) => {
    console.log(state)
    return {data: state.data}
  };

export default connect(mapStateToProps, mapActionsToProps)(home);
