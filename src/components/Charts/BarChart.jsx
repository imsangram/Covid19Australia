import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
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

const BarChart = ({ header = defProps.header, title = defProps.title, labelArray, dataArray }) => {

    useEffect(() => {
        if (labelArray?.length > 0) {
            setChartData({ header, title, labels: labelArray, data: [...dataArray] });
        }
    }, [header, title, labelArray, dataArray])

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [chartData, setChartData] = useState({});

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
    const barChartData = ({
        labels: chartData.labels,
        datasets: [
            {
                label: chartData.title,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: chartData.data
            }
        ]
    });

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
            <Bar
                data={barChartData}
                width={100}
                height={50}
                options={{}} />
        </>
    );
};

export default BarChart;