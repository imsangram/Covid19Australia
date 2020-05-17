import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});


const defProps = {
    header: "Loading ...",
    title: "Loading ..."
}

const LineChart = ({ header = defProps.header, title = defProps.title, labelArray, dataArray }) => {

    useEffect(() => {
        if (labelArray?.length > 0) {
            setChartData({ header, title, labels: labelArray, data: [...dataArray] });
        }
    }, [header, title, labelArray, dataArray])

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [chartData, setChartData] = useState({});


    const lineChartData = ({
        labels: chartData.labels,
        datasets: [
            {
                label: chartData.title,
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: chartData.data
            }
        ]
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFilteredData(newValue);
    };

    function setFilteredData(value) {
        let dataArr = [], labelArr = [];
        switch (value) {
            case 0: // show all data
                labelArr = labelArray;
                dataArr = dataArray;
                break;
            case 1: // Filter  30 days
                dataArr = dataArray.slice(Math.max(dataArray.length - 30, 1));
                labelArr = labelArray.slice(Math.max(dataArray.length - 30, 1));
                break;
            case 2: // filter 7 days
                dataArr = dataArray.slice(Math.max(dataArray.length - 7, 1));
                labelArr = labelArray.slice(Math.max(dataArray.length - 7, 1));
                break;
            default:
                labelArr = labelArray;
                dataArr = dataArray;
        }
        setChartData({
            header: header,
            title: title,
            labels: labelArr,
            data: dataArr,
        });
    }

    return (
        <>
            <h2>{header}</h2>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollButtons="auto"
                >
                    <Tab label="All data" />
                    <Tab label="Last 30 days" />
                    <Tab label="Last 7 days" />
                </Tabs>
            </Paper>
            <Line data={lineChartData} />
        </>
    );
};

export default LineChart;