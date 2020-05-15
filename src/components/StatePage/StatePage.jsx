import React, { useState, useEffect } from 'react';
import statePageStyles from './StatePage.module.css';
import { fetchCovidCount, fetchDailyCovidCount } from '../../api/mapApi';
import BarChart from '../Charts/BarChart';
import cx from 'classnames';
import Stats from '../Stats/Stats';
import LineChart from '../Charts/LineChart';
const StatePage = ({ match }) => {

    useEffect(() => {

        const fetchTopStats = async () => {
            const data = await fetchCovidCount();
            if (data?.states) {
                const stateData = data.states.filter(x => x.id === match.params.id);
                setTopData(stateData[0]);
            };
        }

        const fetchDailyStats = async () => {
            if (match?.params?.id) {
                const paramId = match.params.id;
                let stateObj = statesArray.filter(x => x.id === paramId);
                setStateName(stateObj[0].name);
                const dailyData = await fetchDailyCovidCount();
                if (dailyData) {
                    const dailyStateData = dailyData.map(x => ({ reportDate: x.reportDate, confirmed: x[paramId.toLowerCase()].confirmed, deaths: x[paramId.toLowerCase()].deaths }));
                    setDailyData(dailyStateData);
                };
            }

        }

        fetchTopStats();
        fetchDailyStats();
    }, [])

    const statesArray = [
        { id: 'AUS', name: 'Australia' },
        { id: 'ACT', name: 'Australian Capital Territory' },
        { id: 'NSW', name: 'New South Wales' },
        { id: 'NT', name: 'North Territory' },
        { id: 'QLD', name: 'Queensland' },
        { id: 'SA', name: 'South Australia' },
        { id: 'TAS', name: 'Tasmania' },
        { id: 'VIC', name: 'Victoria' },
        { id: 'WA', name: 'Western Australia' }
    ];
    const [topData, setTopData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [stateName, setStateName] = useState('');


    return (
        <>
            <div className={cx(statePageStyles.margin3, statePageStyles.paddingTop20)}>
                <h1>{stateName}</h1>
                <Stats data={topData} />
                <BarChart header={"Cumulative Covid-19 Cases in " + stateName} title={"New Cases"} labelArray={dailyData.map(x => x.reportDate)} dataArray={dailyData.map(x => x.confirmed)} />
                <LineChart header={"Fatal Cases in " + stateName} title={"Deaths"} labelArray={dailyData.map(x => x.reportDate)} dataArray={dailyData.map(x => x.deaths)} />
            </div>
        </>

    );
};

export default StatePage;