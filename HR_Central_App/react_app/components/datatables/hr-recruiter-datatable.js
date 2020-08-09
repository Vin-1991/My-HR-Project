import React, { useState, Fragment, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { useLocation } from "react-router-dom";
import { HRColumnsRecruiter } from '../utils/data_table_columns';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        overflow: 'hidden'
    },
    formControl: {
        margin: theme.spacing(1),
        maxWidth: 150,
    },
    padBottom: {
        paddingBottom: '5px'
    },
    textArea: {
        width: '-webkit-fill-available',
        height: '90px !important',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px #6D2077',
        border: '1px solid transparent'
    }
}));

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function HRRecruiterDatatable({ getAllKPIValues }) {
    const classes = useStyles();
    const location = useLocation();
    const userDetails = location.state.params;

    const [getSelectedBenefitRow, setSelectedBenefitRow] = useState([]);
    const [getSubmittedJoiningBenefits, setSubmittedJoiningBenefits] = useState([]);
    const [getSelectedRowInfo, setSelectedRowInfo] = useState([]);

    const [getCostCenters, setCostCenters] = useState([]);
    const [getSelectedCostCenter, setSelectedCostCenter] = useState('');

    const [getRejectionComments, setRejectionComments] = useState('');

    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setAlertOpen(true);
        setOpen(false);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const [selectedValue, setSelectedValue] = useState('2');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const approvalsOptions = {
        searchPlaceholder: 'Search Joining Benefits',
        filterType: 'dropdown',
        fixedHeader: true,
        fixedSelectColumn: true,
        tableBodyHeight: '400px',
        selectableRows: 'none',
        onRowClick: (rowData) => {
            handleClickOpen();
            setSelectedBenefitRow(rowData);
            setSelectedCostCenter(getCostCenters.find(id => id.DimCostCenter === rowData[4]));
            setSelectedRowInfo(getSubmittedJoiningBenefits.find(id => id.FactNewJoineeExpenseInfoId === rowData[0]));
        }
    };

    const getAllCostCenter = async () => {
        try {
            const [response] = await Promise.all([
                axios.get('/api/getCostCenter/')
            ]);
            setCostCenters(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllSubmittedJoiningBenefits = async () => {
        try {
            const [response] = await Promise.all([
                axios.post('/api/getExpenseInfoHR/', {
                    email: userDetails.EmployeeEmailId,
                })
            ]);
            setSubmittedJoiningBenefits(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const approveNewJoiningBenefit = async () => {
        try {
            const [response] = await Promise.all([
                axios.post('/api/saveNewJoineeExpenseInfo/', {
                    RecruiterEmailId: getSelectedRowInfo.RecruiterEmailId,
                    HrEmailId: getSelectedRowInfo.HrEmailId,
                    EmployeeNumber: getSelectedRowInfo.EmployeeNumber,
                    EmployeeName: getSelectedRowInfo.EmployeeName,
                    DateofJoining: getSelectedRowInfo.DateofJoining,
                    DimCostCenterId: getSelectedCostCenter.DimCostCenterId,
                    DimHeadId: getSelectedRowInfo.DimHeadId,
                    ClawBackDurationInMonths: getSelectedRowInfo.ClawBackDurationInMonths,
                    TotalExpense: getSelectedRowInfo.TotalExpense,
                    DimExpenseStatusId: selectedValue,
                    TargetRecordCreatedBy: userDetails.EmployeeEmailId,
                })
            ]);
            if (response.status === 200) {
                handleClose();
                getAllSubmittedJoiningBenefits();
                getAllKPIValues();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleRejectComments = (event) => {
        setRejectionComments(event.target.value);
    }

    useEffect(() => {
        trackPromise(getAllCostCenter());
        trackPromise(getAllSubmittedJoiningBenefits());
    }, [getAllKPIValues])


    return (
        <Fragment>
            <MUIDataTable
                title={"Approve Joining Benefits"}
                data={getSubmittedJoiningBenefits}
                columns={HRColumnsRecruiter}
                options={approvalsOptions}
            />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth
                maxWidth="xs">
                <DialogTitle id="form-dialog-title">Select a Status</DialogTitle>
                <DialogContent className={classes.root}>
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <RadioGroup aria-label="approval" name="approval" value={selectedValue} onChange={handleChange}>
                                    <FormControlLabel value="female" control={
                                        <GreenRadio
                                            checked={selectedValue === '2'}
                                            onChange={handleChange}
                                            value='2'
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': '2' }}
                                        />} label="Approve" />
                                    <FormControlLabel value="female" control={
                                        <Radio
                                            checked={selectedValue === '3'}
                                            onChange={handleChange}
                                            value='3'
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': '3' }}
                                        />} label="Reject" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={8}>
                                {selectedValue === '3' && <TextareaAutosize className={classes.textArea}
                                    aria-label="minimum height" onKeyDown={handleRejectComments}
                                    rowsMin={5} placeholder="Rejection Reason/Comments" />}
                            </Grid>
                        </Grid>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={approveNewJoiningBenefit} color="primary"
                        disabled={selectedValue === '3' && getRejectionComments.length < 10}>
                        Submit
                    </Button>
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert onClose={handleClose} severity="success">
                    Saved Successfully!
             </Alert>
            </Snackbar>
        </Fragment>
    );
}