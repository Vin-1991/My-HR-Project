import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(../dist/images/picture1.png)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#6D2077'
    },
    headingKPMG: {
        fontFamily: 'KPMG !important',
        color: '#6D2077'
    },

}));

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [checkEmailInput, setEmailInput] = useState('');
    const [getEmailFoundStatus, setEmailFoundStatus] = useState(false);

    const handleEmailChange = (event) => {
        if (getEmailFoundStatus === true) {
            setEmailFoundStatus(false);
        }
        setEmailInput(event.target.value.trim());
    }

    const checkEmailIdExist = async () => {
        try {

            const [response] = await Promise.all([
                axios.post('/api/getEmpoyeeDetailsByEmail/', {
                    email: checkEmailInput,
                })
            ]);
            if (response.data.length === 0) {
                setEmailFoundStatus(true);
            }
            else {
                setEmailFoundStatus(false);
                routeChange(response);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const routeChange = (response) => {
        let path = '';
        if (response.status === 200 && response.data[0].UserRole === 'HR') {
            path = '/hr_central_home';
            history.push(path, { params: response.data[0] });
        }
        else {
            path = '/home';
            history.push(path, { params: response.data[0] });
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundColor: '#f0f8ff85' }}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h2" className={classes.headingKPMG}>
                        HR-Central
                    </Typography>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Enter Email Address"
                        name="email"
                        onChange={handleEmailChange}
                    />
                    {getEmailFoundStatus === true && < Typography style={{ color: 'red', fontWeight: 'bold' }}>
                        Sorry Email ID not found. Please check and try again.
                    </Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={checkEmailIdExist}
                        disabled={checkEmailInput === ''}>
                        Sign In
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
}