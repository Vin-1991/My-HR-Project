import React, { useState, Fragment, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import ManagerDatatable from "../datatables/manager-datatable";
import ManagerDatatableAddNew from "../datatables/manager-datatable-add-new";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import CountUp from 'react-countup';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
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
    typography: {
        fontFamily: 'Univers For KPMG',
        fontSize: '1.5em'
    }
}));

const AntTabs = withStyles({
    root: {
        borderBottom: "1px solid #e8e8e8"
    },
    indicator: {
        backgroundColor: "#1890ff"
    }
})(Tabs);

const AntTab = withStyles(theme => ({
    root: {
        textTransform: "none",
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(","),
        "&:hover": {
            color: "#40a9ff",
            opacity: 1
        },
        "&$selected": {
            color: "#1890ff",
            fontWeight: theme.typography.fontWeightMedium
        },
        "&:focus": {
            color: "#40a9ff"
        }
    },
    selected: {}
}))(props => <Tab disableRipple {...props} />);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


export default function ManagerDashboard() {
    const classes = useStyles();

    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [value, setValue] = useState(0);
    const [getKPIValues, setKPIValues] = useState([]);

    const location = useLocation();
    const userDetails = location.state.params;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getAllKPIValues = async () => {
        try {
            const [response] = await Promise.all([
                axios.post('/api/getAllKPIValues/', {
                    email: userDetails.EmployeeEmailId,
                    userRole: userDetails.UserRole
                })
            ]);
            setKPIValues(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const smallLineCharts = () => {
        // Functions that create various sparklines
        function createLineNewChart(title, data, color, chartDiv) {
            let container = am4core.create(chartDiv, am4core.Container);
            container.layout = "horizontal";
            container.fixedWidthGrid = true;
            container.width = am4core.percent(100);
            container.height = am4core.percent(100);


            let chart = container.createChild(am4charts.XYChart);
            chart.width = am4core.percent(45);
            chart.height = 70;

            chart.data = data;

            chart.padding(20, 5, 2, 5);

            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.grid.template.disabled = true;
            categoryAxis.renderer.baseGrid.disabled = true;
            categoryAxis.renderer.labels.template.disabled = true;
            categoryAxis.cursorTooltipEnabled = false;
            categoryAxis.dataFields.category = "Period";

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.renderer.grid.template.disabled = true;
            valueAxis.renderer.baseGrid.disabled = true;
            valueAxis.renderer.labels.template.disabled = true;
            valueAxis.cursorTooltipEnabled = false;

            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineY.disabled = true;
            chart.cursor.behavior = "none";

            let series = chart.series.push(new am4charts.LineSeries());
            series.tooltipText = "{Period}: [bold]{value}";
            series.dataFields.categoryX = "Period";
            series.dataFields.valueY = "value";
            series.tensionX = 0.8;
            series.strokeWidth = 1;
            series.stroke = '#fff';

            // render data points as bullets
            let bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.opacity = 1;
            bullet.circle.fill = color;
            bullet.circle.propertyFields.opacity = "opacity";
            bullet.circle.radius = 3;

            return chart;
        }


        createLineNewChart("New", [
            { "Period": 'Jan-Feb', "value": 370 },
            { "Period": "Feb-Mar", "value": 300 },
            { "Period": "Mar-Apr", "value": 250 },
            { "Period": "Apr-May", "value": 439 },
            { "Period": 'May-Jun', "value": 320 },
            { "Period": "Jun-Jul", "value": 289 },
            { "Period": "Jul-Aug", "value": 410, "opacity": 1 }
        ], '#31b3e0', 'chartNewDiv');

        createLineNewChart("Approved", [
            { "Period": 'Jan-Feb', "value": 310 },
            { "Period": "Feb-Mar", "value": 200 },
            { "Period": "Mar-Apr", "value": 240 },
            { "Period": "Apr-May", "value": 389 },
            { "Period": 'May-Jun', "value": 290 },
            { "Period": "Jun-Jul", "value": 289 },
            { "Period": "Jul-Aug", "value": 500, "opacity": 1 }
        ], '#60c483', 'chartApprovedDiv');

        createLineNewChart("Closed", [
            { "Period": 'Jan-Feb', "value": 70 },
            { "Period": "Feb-Mar", "value": 100 },
            { "Period": "Mar-Apr", "value": 10 },
            { "Period": "Apr-May", "value": 50 },
            { "Period": 'May-Jun', "value": 30 },
            { "Period": "Jun-Jul", "value": 289 },
            { "Period": "Jul-Aug", "value": 90, "opacity": 1 }
        ], '#f98483', 'chartClosedDiv');

        createLineNewChart("Paid", [
            { "Period": 'Jan-Feb', "value": 37330 },
            { "Period": "Feb-Mar", "value": 32220 },
            { "Period": "Mar-Apr", "value": 25230 },
            { "Period": "Apr-May", "value": 43659 },
            { "Period": 'May-Jun', "value": 32120 },
            { "Period": "Jun-Jul", "value": 28879 },
            { "Period": "Jul-Aug", "value": 51450, "opacity": 1 }
        ], '#ffc721', 'chartTotalDiv');

        //document.querySelector('[aria-labelledby="id-43-title"]').remove();
        //document.querySelector('[aria-labelledby="id-179-title"]').remove();
        //document.querySelector('[aria-labelledby="id-315-title"]').remove();
        //document.querySelector('[aria-labelledby="id-451-title"]').remove();
    }

    useEffect(() => {
        trackPromise(getAllKPIValues());
        smallLineCharts();
    }, [])

    return (
        <Fragment>
            {/* Stat Cards */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#31b3e0,#1d97c2)', color: 'white' }}>
                    <Typography className={classes.typography}>New - {getKPIValues.length > 0 && <CountUp strat={0}
                        end={getKPIValues[0].Pending} duration={2} useEasing={true} separator="," />}</Typography>
                    <div id="chartNewDiv" style={{ width: "100%", height: "70px" }}></div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#60c483,#41af67)', color: 'white' }}>
                    <Typography className={classes.typography}>Approved - {getKPIValues.length > 0 && <CountUp strat={0}
                        end={getKPIValues[0].Approved} duration={2} useEasing={true} separator="," />}</Typography>
                    <div id="chartApprovedDiv" style={{ width: "100%", height: "70px" }}></div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#f98483,#f75453)', color: 'white' }}>
                    <Typography className={classes.typography}>Rejected - {getKPIValues.length > 0 && <CountUp strat={0}
                        end={getKPIValues[0].Rejected} duration={2} useEasing={true} separator="," />}</Typography>
                    <div id="chartClosedDiv" style={{ width: "100%", height: "70px" }}></div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#ffc721,#edb100)', color: 'white' }}>
                    <Typography className={classes.typography}>Paid - {getKPIValues.length > 0 && <CountUp strat={0}
                        end={getKPIValues[0].AmountDisbursed} duration={2} useEasing={true} separator="," prefix={'₹'} />}</Typography>
                    <div id="chartTotalDiv" style={{ width: "100%", height: "70px" }}></div>
                </Paper>
            </Grid>
            {/* Chart and Table */}
            <Grid item xs={12} md={12} lg={12}>
                <div className={classes.demo1}>
                    <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                        <AntTab label="Approvals" />
                        <AntTab label="Add New Shift" />
                    </AntTabs>
                    <TabPanel value={value} index={0}>
                        <ManagerDatatable getAllKPIValues={getAllKPIValues} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ManagerDatatableAddNew />
                    </TabPanel>
                    <Typography className={classes.padding} />
                </div>
            </Grid>
        </Fragment>
    );
}