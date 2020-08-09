import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import HRRecruiterDatatable from '../datatables/hr-recruiter-datatable';
import AreaChart from '../chart/areaChart';
import PieChart from '../chart/pieofpieChart';
import WaterfallChart from '../chart/waterfallChart';
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
    },
    verticalTabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    verticalTabDiv: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 410,
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

function TabPanelVertical(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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

TabPanelVertical.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function HRRecruiterDashboard() {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [value, setValue] = useState(0);

    const [getKPIValues, setKPIValues] = useState([]);
    const [getVerticalTabValue, setVerticalTabValue] = useState(0);


    const handleVertivalTabChange = (event, newValue) => {
        setVerticalTabValue(newValue);
    };

    const location = useLocation();
    const userDetails = location.state.params;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);

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
            { "Period": 'Jan-Feb', "value": 30 },
            { "Period": "Feb-Mar", "value": 20 },
            { "Period": "Mar-Apr", "value": 25 },
            { "Period": "Apr-May", "value": 43 },
            { "Period": 'May-Jun', "value": 32 },
            { "Period": "Jun-Jul", "value": 28 },
            { "Period": "Jul-Aug", "value": 41, "opacity": 1 }
        ], '#31b3e0', 'chartNewDiv');

        createLineNewChart("Approved", [
            { "Period": 'Jan-Feb', "value": 29 },
            { "Period": "Feb-Mar", "value": 20 },
            { "Period": "Mar-Apr", "value": 23 },
            { "Period": "Apr-May", "value": 40 },
            { "Period": 'May-Jun', "value": 31 },
            { "Period": "Jun-Jul", "value": 27 },
            { "Period": "Jul-Aug", "value": 36, "opacity": 1 }
        ], '#60c483', 'chartApprovedDiv');

        createLineNewChart("Closed", [
            { "Period": 'Jan-Feb', "value": 1 },
            { "Period": "Feb-Mar", "value": 0 },
            { "Period": "Mar-Apr", "value": 2 },
            { "Period": "Apr-May", "value": 3 },
            { "Period": 'May-Jun', "value": 1 },
            { "Period": "Jun-Jul", "value": 1 },
            { "Period": "Jul-Aug", "value": 5, "opacity": 1 }
        ], '#f98483', 'chartClosedDiv');

        createLineNewChart("Paid", [
            { "Period": 'Jan-Feb', "value": 397330 },
            { "Period": "Feb-Mar", "value": 322220 },
            { "Period": "Mar-Apr", "value": 251230 },
            { "Period": "Apr-May", "value": 432659 },
            { "Period": 'May-Jun', "value": 322120 },
            { "Period": "Jun-Jul", "value": 282879 },
            { "Period": "Jul-Aug", "value": 514350, "opacity": 1 }
        ], '#ffc721', 'chartTotalDiv');

        //document.querySelector('[aria-labelledby="id-43-title"]').remove();
        //document.querySelector('[aria-labelledby="id-179-title"]').remove();
        //document.querySelector('[aria-labelledby="id-315-title"]').remove();
        //document.querySelector('[aria-labelledby="id-451-title"]').remove();
    }

    const getAllKPIValues = async () => {
        try {
            const [response] = await Promise.all([
                axios.post('/api/getBonusAndBuyoutKPIHR/', {
                    email: userDetails.EmployeeEmailId
                })
            ]);
            setKPIValues(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        trackPromise(getAllKPIValues());
        smallLineCharts();
    }, [])

    return (
        <Fragment>
            {/* Stat Cards */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#31b3e0,#1d97c2) ', color: 'white' }}>
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
                    <Typography className={classes.typography}>Disbursed - {getKPIValues.length > 0 && <CountUp strat={0}
                        end={getKPIValues[0].AmountDisbursed} duration={2} useEasing={true} separator="," prefix={'₹'} />}</Typography>
                    <div id="chartTotalDiv" style={{ width: "100%", height: "70px" }}></div>
                </Paper>
            </Grid>
            {/* Chart and Table */}
            <Grid item xs={12} md={12} lg={12}>
                <div className={classes.demo1}>
                    <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                        <AntTab label="Approvals" />
                        <AntTab label="Insights" />
                    </AntTabs>
                    <TabPanel value={value} index={0}>
                        <HRRecruiterDatatable getAllKPIValues={getAllKPIValues} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className={classes.verticalTabDiv}>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={getVerticalTabValue}
                                onChange={handleVertivalTabChange}
                                aria-label="Vertical tabs example"
                                className={classes.verticalTabs}
                            >
                                <Tab label="Trend" {...a11yProps(0)} />
                                <Tab label="Segmentation" {...a11yProps(1)} />
                                <Tab label="Cumulation" {...a11yProps(2)} />
                            </Tabs>
                            <TabPanel value={getVerticalTabValue} index={0} style={{ width: '100%' }}>
                                <AreaChart dashboardId={1} />
                            </TabPanel>
                            <TabPanel value={getVerticalTabValue} index={1} style={{ width: '100%' }}>
                                <PieChart />
                            </TabPanel>
                            <TabPanel value={getVerticalTabValue} index={2} style={{ width: '100%' }}>
                                <WaterfallChart />
                            </TabPanel>
                        </div>
                    </TabPanel>
                </div>
            </Grid>
        </Fragment>
    );
}