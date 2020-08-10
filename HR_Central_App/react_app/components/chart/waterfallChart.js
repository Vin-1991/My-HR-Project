import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { Fragment, useEffect } from "react";


export default function WaterfallChart({ dashboardId }) {


    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);

    const createWaterfallChart = () => {


        let chart = am4core.create("chartWaterfallDiv", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

        // using math in the data instead of final values just to illustrate the idea of Waterfall chart
        // a separate data field for step series is added because we don't need last step (notice, the last data item doesn't have stepValue)
        chart.data = [{
            category: "Raised",
            value: 8000,
            open: 0,
            stepValue: 8000,
            color: '#31b3e0',
            displayValue: 8000
        }, {
            category: "Approved",
            value: 8000 - 5000,
            open: 8000,
            stepValue: 8000 - 5000,
            color: '#60c483',
            displayValue: 5000
        }, {
            category: "Rejected",
            value: 8000 - 5000 + 3000,
            open: 8000 - 5000,
            stepValue: 8000 - 5000 + 3000,
            color: '#f98483',
            displayValue: 3000
        }, {
            category: "Net Payable",
            value: 8000 - 3000,
            open: 0,
            color: '#ffc721',
            displayValue: 8000 - 3000
        }];


        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.minGridDistance = 40;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        let columnSeries = chart.series.push(new am4charts.ColumnSeries());
        columnSeries.dataFields.categoryX = "category";
        columnSeries.dataFields.valueY = "value";
        columnSeries.dataFields.openValueY = "open";
        columnSeries.fillOpacity = 0.8;
        columnSeries.sequencedInterpolation = true;
        columnSeries.interpolationDuration = 1500;

        let columnTemplate = columnSeries.columns.template;
        columnTemplate.strokeOpacity = 0;
        columnTemplate.propertyFields.fill = "color";

        let label = columnTemplate.createChild(am4core.Label);
        label.text = "{displayValue.formatNumber('₹#,## a')}";
        label.align = "center";
        label.valign = "middle";


        let stepSeries = chart.series.push(new am4charts.StepLineSeries());
        stepSeries.dataFields.categoryX = "category";
        stepSeries.dataFields.valueY = "stepValue";
        stepSeries.noRisers = true;
        stepSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
        stepSeries.strokeDasharray = "3,3";
        stepSeries.interpolationDuration = 2000;
        stepSeries.sequencedInterpolation = true;

        // because column width is 80%, we modify start/end locations so that step would start with column and end with next column
        stepSeries.startLocation = 0.1;
        stepSeries.endLocation = 1.1;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "none";
        chart.exporting.menu = new am4core.ExportMenu();
    }

    useEffect(() => {
        createWaterfallChart();
    }, [])

    return (
        <Fragment>
            <div id="chartWaterfallDiv" style={{ width: "100%", height: "400px" }}></div>
        </Fragment>
    );
}