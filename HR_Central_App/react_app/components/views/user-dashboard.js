import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserDatatable from "../datatables/user-datatable";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
   
}));

export default function UserDashboard() {
    const classes = useStyles();

    return (
        <Fragment>
            <Grid item xs={12} md={12} lg={12}>               
                <UserDatatable />
            </Grid>
        </Fragment >
    );
}