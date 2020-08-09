import React, { useState, Fragment, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="Rs."
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function UserAddDialog(handleOpenClose) {
    const classes = useStyles();
    const location = useLocation();
    const userDetails = location.state.params;

    const [getShiftDays, setShiftDays] = useState([]);
    const [getSelectedShiftDays, setSelectedShiftDays] = useState('');
    const [calculateShiftTypeAmount, setfetchShiftTypeAmount] = useState('');

    const [getShiftAllowanceStatus, setShiftAllowanceStatus] = useState([]);
    const [getSelectedShiftAllowanceStatus, setSelectedShiftAllowanceStatus] = useState('');

    const [getShiftMonth, setShiftMonth] = useState([]);
    const [getSelectedShiftMonth, setSelectedShiftMonth] = useState('');
    const [getActualShiftMonth, setActualshiftMonth] = useState('');

    const [getShiftYear, setShiftYear] = useState([]);
    const [getSelectedShiftYear, setSelectedShiftYear] = useState('');
    const [getActualShiftYear, setActualShiftYear] = useState('');


    const [getShiftType, setShiftType] = useState([]);
    const [getSelectedShiftType, setSelectedShiftType] = useState('');
    const [fetchShiftTypeAllowance, setfetchShiftTypeAllowance] = useState('');

    const getAllShiftAllowanceStatus = async () => {
        try {
            const [response] = await Promise.all([
                axios.get('/api/getShiftAllowanceStatus/')
            ]);
            setShiftAllowanceStatus(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllShiftDays = async () => {
        try {
            const [response] = await Promise.all([
                axios.get('/api/getShiftDays/')
            ]);
            setShiftDays(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllShiftMonth = async () => {
        try {
            const [response] = await Promise.all([
                axios.get('/api/getShiftMonth/')
            ]);
            setShiftMonth(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllShiftYear = async () => {
        try {
            const [response] = await Promise.all([
                axios.get('/api/getShiftYear/')
            ]);
            setShiftYear(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllShiftType = async () => {
        try {
            const [response] = await Promise.all([
                axios.get('/api/getShiftType/')
            ]);
            setShiftType(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const saveNewShiftAllowance = async () => {
        try {

            const [response] = await Promise.all([
                axios.post('/api/saveNewShiftAllowance/', {
                    EmployeeEmailId: userDetails.EmployeeEmailId,
                    ManagerEmailId: userDetails.ManagerEmailId,
                    HrEmailId: userDetails.HrEmailID,
                    ShiftMonth: getActualShiftMonth.ShiftMonth,
                    ShiftYear: getActualShiftYear.ShiftYear,
                    DimShiftTypeId: getSelectedShiftType,
                    NoOfDaysWorked: getSelectedShiftDays,
                    TotalAmount: calculateShiftTypeAmount,
                    DimShiftAllowanceStatusId: 1,
                    TargetRecordCreatedBy: userDetails.EmployeeEmailId
                })
            ]);
            if (response.status === 200) {
                handleClose();
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        trackPromise(getAllShiftAllowanceStatus());
        trackPromise(getAllShiftDays());
        trackPromise(getAllShiftMonth());
        trackPromise(getAllShiftYear());
        trackPromise(getAllShiftType());
    }, [])

    const handleClose = () => {
        handleOpenClose.setOpen(false);
    };

    const SelectedShiftMonth = (event) => {
        setSelectedShiftMonth(event.target.value);
        setActualshiftMonth(getShiftMonth.find(month => month.DimShiftMonthId === event.target.value));
    }

    const SelectedShiftDays = (event) => {
        setSelectedShiftDays(event.target.value);
        setfetchShiftTypeAmount(fetchShiftTypeAllowance.ShiftALlowancePerDay * event.target.value);
    }
    const SelectedShiftYear = (event) => {
        setSelectedShiftYear(event.target.value);
        setActualShiftYear(getShiftYear.find(year => year.DimShiftYearId === event.target.value));
    }
    const SelectedShiftType = (event) => {
        setSelectedShiftType(event.target.value);
        setfetchShiftTypeAllowance(getShiftType.find(allowance => allowance.DimShiftTypeId === event.target.value));
    }

    return (
        <Fragment>
            <Dialog open={handleOpenClose.handleOpenClose} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Add New Shift Allowance</DialogTitle>
                <DialogContent className={classes.root}>
                    <TextField
                        margin="dense"
                        id="empnumber"
                        label="Emp ID"
                        disabled
                        value={userDetails.EmployeeNumber || ''}
                    />
                    <TextField
                        margin="dense"
                        id="manager name"
                        label="Manager Name"
                        disabled
                        value={userDetails.ManagerName || ''}
                    />
                    <TextField
                        margin="dense"
                        id="hr name"
                        label="HR Name"
                        disabled
                        value={userDetails.HrName || ''}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Shift Month</InputLabel>
                        <Select
                            labelId="shift-month-label"
                            id="shift-month"
                            value={getSelectedShiftMonth}
                            onChange={SelectedShiftMonth}
                        >
                            {getShiftMonth.map((option, index) => {
                                return <MenuItem key={option.DimShiftMonthId} value={option.DimShiftMonthId}>{option.ShiftMonth}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Shift Year</InputLabel>
                        <Select
                            labelId="shift-year-label"
                            id="shift-year-helper"
                            value={getSelectedShiftYear}
                            onChange={SelectedShiftYear}
                        >
                            {getShiftYear.map((option) => {
                                return <MenuItem key={option.DimShiftYearId} value={option.DimShiftYearId}>{option.ShiftYear}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Shift Type</InputLabel>
                        <Select
                            labelId="shift-type-label"
                            id="shift-type-helper"
                            value={getSelectedShiftType}
                            onChange={SelectedShiftType}
                        >
                            {getShiftType.map((option) => {
                                return <MenuItem key={option.DimShiftTypeId} value={option.DimShiftTypeId}>{option.ShiftType}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="amount"
                        label="Shift Allowance Amount"
                        disabled
                        value={fetchShiftTypeAllowance.ShiftALlowancePerDay || ''}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Shift Days</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={getSelectedShiftDays}
                            onChange={SelectedShiftDays}
                        >
                            {getShiftDays.map((option, index) => {
                                return <MenuItem key={index} value={option.Day}>{option.Day}</MenuItem>;
                            })}
                        </Select>

                    </FormControl>
                    <TextField
                        margin="dense"
                        id="amount"
                        label="Calculated Shift Amount"
                        disabled
                        value={calculateShiftTypeAmount || ''}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={saveNewShiftAllowance} variant="contained" color="primary"
                        disabled={getSelectedShiftType === '' || getSelectedShiftYear === '' || getSelectedShiftMonth === '' || getSelectedShiftDays === ''}>
                        Submit
                    </Button>
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
