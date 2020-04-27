import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyCovidCount } from '../../api/mapApi'

const DailyChart = () => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDailyCovidCount();
            if (data) {
                setDailyData(data);
            };
        }
        fetchData();
    }, [])

    const data = dailyData ? ({
        labels: dailyData.map(x => (x.reportDate)),
        datasets: [
            {
                label: 'Daily cases in Australia',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: dailyData.map(x => (x.confirmed))
            }
        ]
    }) : null;


    const lineChart = (
        dailyData[0] ? (
            <Line
                data={{
                    labels: dailyData.map(({ reportDate }) => reportDate),
                    datasets: [{
                        data: dailyData.map((data) => data.confirmed),
                        label: 'Confirmed cases',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map((data) => data.newCases),
                        label: 'New cases',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
            />
        ) : null
    );

    return (
        <div className="flex flex-col items-center w-full max-w-md">
            <h2>Confirmed Cases</h2>
            {
                dailyData ? (
                    <Bar
                        data={data}
                        width={100}
                        height={50}
                        options={{}}
                    />) : null
            }
            <h2>Confirmed vs New cases</h2>
            {lineChart}
        </div>
    );
};

export default DailyChart;
