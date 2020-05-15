import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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
        <>
            <div>
                <h2>Confirmed vs New cases</h2>
                {lineChart}

            </div>

        </>
    );
};

export default DailyChart;
