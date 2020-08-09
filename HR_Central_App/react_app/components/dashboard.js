import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserDashboard from '../components/views/user-dashboard';
import HRDashboard from '../components/views/hr-dashboard';
import ManagerDashboard from '../components/views/manager-dashboard';
import RecruiterDashboard from '../components/views/recruiter-dashboard';
import HRRecruiterDashboard from '../components/views/hr-recruiter-dashboard';
import SettingsPowerIcon from '@material-ui/icons/SettingsPower';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        fontFamily: 'KPMG !important',
        fontSize: 'xx-large'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {

    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const [getRenderDashboardValue, setRenderDashboardValue] = useState(0);
    const location = useLocation();
    const userDetails = location.state.params;
    const userName = userDetails.EmployeeName.split(',')
    const history = useHistory();

    const routeChange = () => {
        let path = '/hr_central_home';
        history.push(path, { params: userDetails });
    }

    const getValuetoRenderDashboard = (renderValue) => {
        switch (renderValue) {
            case 'User':
                setRenderDashboardValue(1);
                break;
            case 'Manager':
                setRenderDashboardValue(2);
                break;
            case 'HR':
                setRenderDashboardValue(3);
                break;
            case 'Recruiter':
                setRenderDashboardValue(4);
                break;
        }
    }

    useEffect(() => {
        getValuetoRenderDashboard(userDetails.UserRole);
    }, [getRenderDashboardValue]);


    const handleLogout = () => {
        console.log('you have been logged out. boo!');
        history.push('/login');
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar} variant="dense">
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        HR-Central {(getRenderDashboardValue === 3 && userDetails.page === 'shift')
                            ? 'Shift Allowance' : (getRenderDashboardValue === 3 && userDetails.page === 'recruiter') ? 'Joining Benefits' : ''}
                    </Typography>
                    {(getRenderDashboardValue === 3) && <IconButton color="inherit" onClick={routeChange}>
                        <HomeIcon />
                    </IconButton>}
                    {/*<IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>*/}
                    <AccountCircleIcon />
                    <Typography component="h1" variant="h6" color="inherit">
                        Hi, {userName[1] + ' ' + userName[0]}
                    </Typography>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <SettingsPowerIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {getRenderDashboardValue === 1 && <UserDashboard />}
                        {getRenderDashboardValue === 2 && <ManagerDashboard />}
                        {(getRenderDashboardValue === 3 && userDetails.page === 'shift') && <HRDashboard />}
                        {getRenderDashboardValue === 4 && <RecruiterDashboard />}
                        {(getRenderDashboardValue === 3 && userDetails.page === 'recruiter') && <HRRecruiterDashboard />}
                    </Grid>

                </Container>
            </main>
        </div>
    );
}