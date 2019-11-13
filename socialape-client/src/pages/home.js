import React from 'react';

import Grid from '@material-ui/core/Grid'

class home extends React.Component{
   

    render(){
        return (
            <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                <p>Content...</p>
            </Grid>
            <Grid item sm={4} xs={12}>
                <p>Pfofile...</p>
            </Grid>
        </Grid>
        )
    }
} 

export default home;