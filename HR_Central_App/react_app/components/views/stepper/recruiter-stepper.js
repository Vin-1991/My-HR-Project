import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CountUp from 'react-countup';

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#ffa808',
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#00c72e',
        zIndex: 1,
        fontSize: 25,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
}));


export default function RecruiterStepper({ currentStatus, getExpenseInfoHR }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [getSteps, setSteps] = useState([]);

    const getAndDisplayStatus = (status) => {
        switch (status) {
            case 1:
                setSteps(['Joining Benefit Submitted', 'Pending with HR']);
                setActiveStep(1);
                break;
            case 2:
                setSteps(['Joining Benefit Submitted', 'Disbursed']);
                setActiveStep(2);
                break;
            case 3:
                setSteps(['Shift Allowance Raised', 'Rejected by HR']);
                setActiveStep(1);
                break;
        }

    }


    useEffect(() => {
        getAndDisplayStatus(currentStatus[0].DimExpenseStatusId);
    }, [currentStatus, getExpenseInfoHR])

    return (
        <Fragment>
            {getAndDisplayStatus.length &&
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid item xs={1}>
                            {getExpenseInfoHR.length > 0 &&
                                <Card className={classes.card} style={{ boxShadow: 'none', borderRadius: '0px' }}>
                                    <Typography style={{ margin: '4px', fontWeight: 'bold', color: '#6D2077' }}>
                                        Status of - <CountUp strat={0} end={getExpenseInfoHR[0].FactNewJoineeExpenseInfoId} duration={1} useEasing={true} /></Typography>
                                </Card>
                            }
                        </Grid>
                        <Grid item xs={11}>
                            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                                {getSteps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Grid>
                    </Grid>
                </Container>
            }
        </Fragment >
    );
}
