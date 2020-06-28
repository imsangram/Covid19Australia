import React, { useContext } from 'react';
import statePageStyles from './StatePage.module.css';
import BarChart from '../Charts/BarChart';
import cx from 'classnames';
import Stats from '../Stats/Stats';
import LineChart from '../Charts/LineChart';
import { CovidDataContext } from '../Context/CovidDataContext';

const StatePage = ({ match }) => {

    const { globalCovidData } = useContext(CovidDataContext);
    const paramId = match.params.id;

    const topData = globalCovidData?.states?.filter(x => x.id === match.params.id)[0] || null;
    const stateName = topData?.name || 'loading ...';
    const dailyData = globalCovidData?.dailyData?.map(x => ({ reportDate: x.reportDate, confirmed: x[paramId.toLowerCase()].confirmed, deaths: x[paramId.toLowerCase()].deaths, newCases: x[paramId.toLowerCase()].newCases, newDeaths: x[paramId.toLowerCase()].newDeaths })) || null;

    const reporData = dailyData?.map(x => x.reportDate) || null;
    const confirmedData = dailyData?.map(x => x.confirmed) || null;
    const deathsData = dailyData?.map(x => x.deaths) || null;
    const newCasesData = dailyData?.map(x => x.newCases) || null;
    const newDeathsData = dailyData?.map(x => x.newDeaths) || null;

    /*******         
     * 
     * Replaced useEffect, useState with Context API 
    * 

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

    const [topData, setTopData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [stateName, setStateName] = useState('');
    
    *******/
    return (
        <>
            <div className={cx(statePageStyles.margin3, statePageStyles.paddingTop20)}>
                <h1>{stateName}</h1>
                <Stats data={topData} />
                <BarChart header={"Daily New Covid-19 Cases in " + stateName} title={"New Cases"} labelArray={reporData} dataArray={newCasesData} />
                <BarChart header={"Cumulative Covid-19 Cases in " + stateName} title={"Confirmed Cases"} labelArray={reporData} dataArray={confirmedData} />
                <LineChart header={"Fatal Cases in " + stateName} title={"Deaths"} labelArray={reporData} dataArray={deathsData} />
                <LineChart header={"New Fatal Cases in " + stateName} title={"New Deaths"} labelArray={reporData} dataArray={newDeathsData} />
            </div>
        </>

    );
};

export default StatePage;