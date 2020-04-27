import React from 'react';
import { Doughnut } from 'react-chartjs-2';


const StateWiseChart = ({ chartData }) => {

    const data = chartData ? {
        labels: chartData.map(state => (state.id)),
        datasets: [
            {
                data: chartData.map(state => (state.confirmed)),
                backgroundColor: ['rgb(1, 176, 241)', 'rgb(255, 192, 0)', 'rgb(197, 91, 17)', 'rgb(112, 48, 160)', 'rgb(0, 175, 180)', 'rgb(0, 113, 193)', 'rgb(255, 127, 39)', 'rgb(127, 255, 39)'],
                hoverBackgroundColor: Array.from({ length: 8 }, (_, i) => i).map(x => ('#' + Math.floor(Math.random() * 16777215).toString(16)))
            }
        ]
    } : null;

    return (
        <div>
            <div className="flex flex-col items-center w-full max-w-md">
                <h2>Confirmed cases</h2>
                {
                    data ? <Doughnut data={data} /> : 'Loading ...'
                }
            </div>
        </div>
    );
};

export default StateWiseChart;