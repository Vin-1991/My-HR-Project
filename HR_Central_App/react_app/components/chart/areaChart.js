import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { Fragment, useEffect } from "react";


export default function AreaChart({ dashboardId }) {


    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);

    const createAreaChart = () => {

        let chart = am4core.create("chartAreaDiv", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

        chart.data = [{
            "Period": "Jan-Feb",
            "CountOfShiftRequests": 370
        }, {
            "Period": "Feb-Mar",
            "CountOfShiftRequests": 300
        }, {
            "Period": "Mar-Apr",
            "CountOfShiftRequests": 250
        }, {
            "Period": "Apr-May",
            "CountOfShiftRequests": 439
        }, {
            "Period": "May-Jun",
            "CountOfShiftRequests": 320
        }, {
            "Period": "Jun-Jul",
            "CountOfShiftRequests": 389
        }, {
            "Period": "Jul-Aug",
            "CountOfShiftRequests": 510
        }];

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "Period";
        categoryAxis.renderer.minGridDistance = 40;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        let series = chart.series.push(new am4charts.CurvedColumnSeries());
        series.dataFields.categoryX = "Period";
        series.dataFields.valueY = "CountOfShiftRequests";
        series.tooltipText = "{valueY.CountOfShiftRequests}"
        series.columns.template.strokeOpacity = 0;

        series.columns.template.fillOpacity = 0.75;

        let hoverState = series.columns.template.states.create("hover");
        hoverState.properties.fillOpacity = 1;
        hoverState.properties.tension = 0.4;

        chart.cursor = new am4charts.XYCursor();

        var colorSet = new am4core.ColorSet();
        colorSet.list = ["#0091DA", "#483698", "#470A68", "#6D2077", "#00A3A1"].map(function (color) {
            return new am4core.color(color);
        });
        chart.colors = colorSet;

        // Add distinctive colors for each column using adapter
        series.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });


        chart.scrollbarX = new am4core.Scrollbar();
    }

    useEffect(() => {
        createAreaChart();
    }, [])

    return (
        <Fragment>
            <div id="chartAreaDiv" style={{ width: "100%", height: "400px" }}></div>
        </Fragment>
    );
}