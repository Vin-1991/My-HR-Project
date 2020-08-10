import React from 'react';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

export const UserColumns = [
    {
        name: "TblFactEmployeeShiftAllowanceSummaryId",
        label: "Shift Allowance Id",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ManagerName",
        label: "Manager Name",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "HrName",
        label: "HR Name",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "ShiftMonth",
        label: "Shift Month",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ShiftYear",
        label: "Shift Year",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ShiftType",
        label: "Shift Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "NoOfDaysWorked",
        label: "No. of days Worked",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TotalShiftAllowance",
        label: "Total Shift Allowance",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ShiftAllowanceStatus",
        label: "Shift Allowance Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                let renderColor = '', iconRender = '';
                if (value.includes('Approved')) {
                    renderColor = '#00c72e';
                    iconRender = <CheckCircleOutlineSharpIcon />;
                }
                if (value.includes('Pending')) {
                    renderColor = '#ffa808';
                    iconRender = <UpdateSharpIcon />;
                }
                if (value.includes('Rejected')) {
                    renderColor = '#ff073a';
                    iconRender = <CancelSharpIcon />;
                }
                return (
                    <div>
                        <Chip size="small"
                            icon={iconRender}
                            label={value}
                            color='primary'
                            style={{ backgroundColor: renderColor }}
                        />
                        {/* {tableMeta.rowData[8].includes('Rejected') && <q style={{ color: 'red' }}>{tableMeta.rowData[9]}</q>}*/}
                    </div>
                );
            }
        }
    },
    {
        name: "ShiftAllowanceRejectionComments",
        label: "Rejection Comments",
        options: {
            display: false
        }
    },

];

export const RecruiterColumns = [
    {
        name: "FactNewJoineeExpenseInfoId",
        label: "Expense Id",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EmployeeNumber",
        label: "Employee Id",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EmployeeName",
        label: "Employee Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "HrName",
        label: "HR Name",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "DimCostCenter",
        label: "Cost Center",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Dimhead",
        label: "Head",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ClawBackDurationInMonths",
        label: "Clawback Duration In Months",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DateofJoining",
        label: "D-O-J",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TotalExpense",
        label: "Total Expense",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DimExpenseStatus",
        label: "Expense Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                let renderColor = '', iconRender = '';
                if (value.includes('Approved')) {
                    renderColor = '#00c72e';
                    iconRender = <CheckCircleOutlineSharpIcon />;
                }
                if (value.includes('Pending')) {
                    renderColor = '#ffa808';
                    iconRender = <UpdateSharpIcon />;
                }
                if (value.includes('Rejected')) {
                    renderColor = '#ff073a';
                    iconRender = <CancelSharpIcon />;
                }
                if (value.includes('Disbursed')) {
                    renderColor = '#ffc721';
                    iconRender = <AccountBalanceWalletIcon />;
                }
                return (
                    <Chip size="small"
                        icon={iconRender}
                        label={value}
                        color='primary'
                        style={{ backgroundColor: renderColor }}
                    />
                );
            }
        }
    }
];

export const HRColumns = [
    {
        name: "TblFactEmployeeShiftAllowanceSummaryId",
        label: "Shift Allowance Id",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EmployeeName",
        label: "Employee Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ManagerName",
        label: "Manager Name",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "ShiftMonth",
        label: "Shift Month",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ShiftYear",
        label: "Shift Year",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ShiftType",
        label: "Shift Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "NoOfDaysWorked",
        label: "No. of days Worked",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TotalShiftAllowance",
        label: "Total Shift Allowance",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ShiftAllowanceStatus",
        label: "Shift Allowance Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                let renderColor = '', iconRender = '';
                if (value.includes('Approved')) {
                    renderColor = '#00c72e';
                    iconRender = <CheckCircleOutlineSharpIcon />;
                }
                if (value.includes('Pending')) {
                    renderColor = '#ffa808';
                    iconRender = <UpdateSharpIcon />;
                }
                if (value.includes('Rejected')) {
                    renderColor = '#ff073a';
                    iconRender = <CancelSharpIcon />;
                }
                return (
                    <Chip size="small"
                        icon={iconRender}
                        label={value}
                        color='primary'
                        style={{ backgroundColor: renderColor }}
                    />
                );
            }
        }
    }
];

export const HRColumnsRecruiter = [
    {
        name: "FactNewJoineeExpenseInfoId",
        label: "Expense Id",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EmployeeNumber",
        label: "Employee Id",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EmployeeName",
        label: "Employee Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "RecruiterName",
        label: "Recruiter Name",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "DimCostCenter",
        label: "Cost Center",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Dimhead",
        label: "Head",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ClawBackDurationInMonths",
        label: "Clawback Duration In Months",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DateofJoining",
        label: "D-O-J",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TotalExpense",
        label: "Total Expense",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DimExpenseStatus",
        label: "Expense Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                let renderColor = '', iconRender = '';
                if (value.includes('Approved')) {
                    renderColor = '#00c72e';
                    iconRender = <CheckCircleOutlineSharpIcon />;
                }
                if (value.includes('Pending')) {
                    renderColor = '#ffa808';
                    iconRender = <UpdateSharpIcon />;
                }
                if (value.includes('Rejected')) {
                    renderColor = '#ff073a';
                    iconRender = <CancelSharpIcon />;
                }
                if (value.includes('Disbursed')) {
                    renderColor = '#ffc721';
                    iconRender = <AccountBalanceWalletIcon />;
                }
                return (
                    <Chip size="small"
                        icon={iconRender}
                        label={value}
                        color='primary'
                        style={{ backgroundColor: renderColor }}
                    />
                );
            }
        }
    }


];

export const ManagerColumns = [
    {
        name: "TblFactEmployeeShiftAllowanceSummaryId",
        label: "Shift Allowance Id",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EmployeeName",
        label: "Employee Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "HrName",
        label: "HR Name",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "ShiftMonth",
        label: "Shift Month",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ShiftYear",
        label: "Shift Year",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ShiftType",
        label: "Shift Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "NoOfDaysWorked",
        label: "No. of days Worked",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TotalShiftAllowance",
        label: "Total Shift Allowance",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ShiftAllowanceStatus",
        label: "Shift Allowance Status",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                let renderColor = '', iconRender = '';
                if (value.includes('Approved')) {
                    renderColor = '#00c72e';
                    iconRender = <CheckCircleOutlineSharpIcon />;
                }
                if (value.includes('Pending')) {
                    renderColor = '#ffa808';
                    iconRender = <UpdateSharpIcon />;
                }
                if (value.includes('Rejected')) {
                    renderColor = '#ff073a';
                    iconRender = <CancelSharpIcon />;
                }
                return (
                    <Chip size="small"
                        icon={iconRender}
                        label={value}
                        color='primary'
                        style={{ backgroundColor: renderColor }}
                    />
                );
            }
        }
    }
];

