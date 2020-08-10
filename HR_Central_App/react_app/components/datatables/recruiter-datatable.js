import React, { useState, Fragment, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { RecruiterColumns } from '../utils/data_table_columns';
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
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import RecruiterStepper from "../views/stepper/recruiter-stepper";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Input from '@material-ui/core/Input';


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
    padBottom: {
        paddingBottom: '5px'
    }
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
            prefix="₹"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function RecruiterDatatable() {
    const classes = useStyles();

    const location = useLocation();
    const userDetails = location.state.params;

    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const [getLatestStatus, setLatestStatus] = useState([]);

    const [getExpenseStatuses, setExpenseStatuses] = useState([]);
    const [getEmployeeId, setEmployeeId] = useState('');
    const [getEmployeeName, setEmployeeName] = useState('');
    const [getExpenseAmount, setExpenseAmount] = useState('');

    const [getCostCenters, setCostCenters] = useState([]);
    const [getSelectedCostCenter, setSelectedCostCenter] = useState('');

    const [getHeads, setHeads] = useState([]);
    const [getSelectedHead, setSelectedHead] = useState('');
    const [getFetchHeadId, setFetchHeadId] = useState('');

    const [getRecruiterHRMapping, setRecruiterHRMapping] = useState([]);

    const [getDays, setDays] = useState([]);
    const [getSelectedClawbackDuration, setSelectedClawbackDuration] = useState('');

    const [getExpenseInfoHR, setExpenseInfoHR] = useState([]);

    const [getSelectedDate, setSelectedDate] = useState(today);

    const handleAlertClose = () => {
        setAlertOpen(false);
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

    const getAllExpenseStatus = async () => {
        try {
            const [response] = await Promise.all([
                axios.get('/api/getExpenseStatus/')
            ]);
            setExpenseStatuses(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllHeads = async () => {
        try {
            const [response] = await Promise.all([
                axios.get('/api/getHead/')
            ]);
            setHeads(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllRecruiterHRMapping = async () => {
        try {
            const [response] = await Promise.all([
                axios.get('/api/getRecruiterHRMapping/')
            ]);
            setRecruiterHRMapping(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllDays = async () => {
        try {
            const [response] = await Promise.all([
                axios.get('/api/getShiftDays/')
            ]);
            setDays(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllExpenseInfoHR = async () => {
        try {
            const [response] = await Promise.all([
                axios.post('/api/getExpenseInfoHR/', {
                    email: userDetails.EmployeeEmailId
                })
            ]);
            setExpenseInfoHR(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const saveNewJoineeExpenseInfo = async () => {
        try {

            const [response] = await Promise.all([
                axios.post('/api/saveNewJoineeExpenseInfo/', {
                    RecruiterEmailId: userDetails.EmployeeEmailId,
                    HrEmailId: userDetails.HrEmailID,
                    EmployeeNumber: getEmployeeId,
                    EmployeeName: getEmployeeName,
                    DateofJoining: getSelectedDate,
                    DimCostCenterId: getSelectedCostCenter,
                    DimHeadId: getSelectedHead,
                    ClawBackDurationInMonths: getSelectedClawbackDuration,
                    TotalExpense: getExpenseAmount,
                    DimExpenseStatusId: 1,
                    TargetRecordCreatedBy: userDetails.EmployeeEmailId,
                })
            ]);
            if (response.status === 200) {
                onFileUpload();
                handleClose();
                getAllExpenseInfoHR();
                getCurrentStatus();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getCurrentStatus = async () => {
        try {
            const [response] = await Promise.all([
                axios.post('/api/getJoiningBenefitsLatestStatus/', {
                    email: userDetails.EmployeeEmailId,
                })
            ]);
            setLatestStatus(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setAlertOpen(true);
        setOpen(false);
    };

    useEffect(() => {
        trackPromise(getAllCostCenter());
        trackPromise(getAllExpenseStatus());
        trackPromise(getAllHeads());
        trackPromise(getAllRecruiterHRMapping());
        trackPromise(getAllDays());
        trackPromise(getAllExpenseInfoHR());
        trackPromise(getCurrentStatus());
    }, [])

    const EnteredEmployeeID = (event) => {
        setEmployeeId(event.target.value);
    }

    const EnteredEmployeeName = (event) => {
        setEmployeeName(event.target.value);
    }

    const EnteredExpenseAmount = (event) => {
        setExpenseAmount(event.target.value);
    }

    const SelectedCostCenter = (event) => {
        setSelectedCostCenter(event.target.value);
    }

    const SelectedHead = (event) => {
        setSelectedHead(event.target.value);
    }

    const SelectedClawbackDuration = (event) => {
        setSelectedClawbackDuration(event.target.value);
    }

    const SelectedDateOfJoining = (date) => {
        setSelectedDate(date);
    };


    const options = {
        searchPlaceholder: 'Search Shift Allowance',
        filterType: 'dropdown',
        fixedHeader: true,
        fixedSelectColumn: true,
        tableBodyHeight: '400px',
        selectableRows: 'none',
        customToolbar: () => {
            return (
                <Tooltip title={"Add Shift Allowance"}>
                    <IconButton onClick={handleClickOpen}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            );
        }
    };

    const [uploadedFile, setUploadedFile] = useState(null);

    const onFileChange = (e) => {
        setUploadedFile(e.target.files[0])
    }

    const onFileUpload = () => {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "PDFFile",
            uploadedFile,
            uploadedFile.name
        );

        // Details of the uploaded file 
        console.log(uploadedFile);
        uploadPDFFile(formData)

    };

    const uploadPDFFile = async (formData) => {
        try {
            const [response] = await Promise.all([
                axios.post('/api/fileUpload/', formData)
            ]);
            response.data;
        } catch (err) {
            console.log(err);
        }

    };


    return (
        <Fragment>
            {getLatestStatus.length > 0 && <RecruiterStepper currentStatus={getLatestStatus} getExpenseInfoHR={getExpenseInfoHR} />}
            <div className={classes.padBottom} />
            <MUIDataTable
                title={"Joining Benefits"}
                data={getExpenseInfoHR}
                columns={RecruiterColumns}
                options={options}
            />

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Add New Employee Joining Benefits</DialogTitle>
                <DialogContent className={classes.root}>
                    <TextField
                        margin="dense"
                        id="empnumber"
                        label="Employee ID"
                        type="number"
                        value={getEmployeeId || ''}
                        onChange={EnteredEmployeeID}
                    />
                    <TextField
                        margin="dense"
                        id="emp name"
                        label="Employee Name"
                        value={getEmployeeName || ''}
                        onChange={EnteredEmployeeName}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Cost Center</InputLabel>
                        <Select
                            labelId="cc-label"
                            id="cost-center"
                            value={getSelectedCostCenter}
                            onChange={SelectedCostCenter}
                        >
                            {getCostCenters.map((option) => {
                                return <MenuItem key={option.DimCostCenterId} value={option.DimCostCenterId}>{option.DimCostCenter}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Head</InputLabel>
                        <Select
                            labelId="head-label"
                            id="head"
                            value={getSelectedHead}
                            onChange={SelectedHead}
                        >
                            {getHeads.map((option) => {
                                return <MenuItem key={option.DimHeadId} value={option.DimHeadId}>{option.DimHead}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Clawback Duration in Months</InputLabel>
                        <Select
                            labelId="clawback-label"
                            id="clawback"
                            value={getSelectedClawbackDuration}
                            onChange={SelectedClawbackDuration}
                        >
                            {getDays.map((option) => {
                                return <MenuItem key={option.Name} value={option.Day}>{option.Day}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date of Joining"
                            value={getSelectedDate}
                            onChange={SelectedDateOfJoining}
                            KeyboardButtonProps={{
                                'aria-label': 'select date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        margin="dense"
                        id="expense-amount"
                        label="Expense Amount"
                        value={getExpenseAmount || ''}
                        onChange={EnteredExpenseAmount}
                        name="numberformat"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                    <input id="my-input" type="file" onChange={onFileChange} placeholder="Please Choose a file" />

                    {getExpenseAmount.length > 6 && <h5 style={{ color: 'red' }}>Please input amount less than 10,00,000</h5>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={saveNewJoineeExpenseInfo} variant="contained" color="primary"
                        disabled={getEmployeeId === '' || getEmployeeName === '' || getSelectedCostCenter === '' || getSelectedClawbackDuration === ''
                            || uploadedFile === null || getSelectedHead === '' || getExpenseAmount === '' || getExpenseAmount.length > 6}>
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