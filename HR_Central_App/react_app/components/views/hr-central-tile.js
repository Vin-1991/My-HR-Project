import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory, useLocation } from 'react-router-dom';
import SettingsPowerIcon from '@material-ui/icons/SettingsPower';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    headingKPMG: {
        fontFamily: 'KPMG !important',
        letterSpacing: '2px'
    },
    fontKPMG: {
        fontFamily: "'Univers for KPMG' !important"
    }

}));

const cards = [{ 'id': 1, 'name': 'Shift Allowance', 'image': '../dist/images/people.jpg', 'page': 'shift' },
{ 'id': 2, 'name': 'Joining Benefits', 'image': '../dist/images/bonus.jpg', 'page': 'recruiter' }];

export default function Album() {
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();
    const userDetails = location.state.params;
    const userName = userDetails.EmployeeName.split(',')

    const routeChange = (page) => {
        let path = '';

        if (page === 'shift') {
            path = '/home';
            userDetails.page = 'shift';
            history.push(path, { params: userDetails });
        }
        else {
            path = '/home';
            userDetails.page = 'recruiter';
            history.push(path, { params: userDetails });
        }
    }

    const handleLogout = () => {
        console.log('you have been logged out. boo!');
        history.push('/login');
    };

    return (
        <Fragment>
            <CssBaseline />
            <main style={{ backgroundImage: `url(${"../dist/images/16317.png"})`, height: '100vh' }}>
                <IconButton color="inherit" onClick={handleLogout} style={{ color: "#fff", float: 'right' }}>
                    <SettingsPowerIcon />
                </IconButton>
                <Container className={classes.cardGrid} maxWidth="md" align="center">
                    <Typography component="h1" variant="h2" className={classes.headingKPMG} style={{ marginBottom: '0.5em', color: '#fff' }}>
                        Welcome! {userName[1] + ' ' + userName[0]}
                    </Typography>
                    {/* End hero unit */}
                    <Grid container spacing={4} justify="center" >
                        {cards.map((card) => (
                            <Grid item key={card.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardActionArea onClick={() => routeChange(card.page)}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={card.image}
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h4" component="h2" className={classes.headingKPMG} style={{ color: '#6D2077' }}>
                                                {card.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </Fragment>
    );
}