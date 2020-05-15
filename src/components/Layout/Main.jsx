import React, { useEffect, useState } from 'react';
import Map from '../Map/Map'
import StateTable from '../../components/Tables/StateTable';
import Stats from '../Stats/Stats';
import layoutStyles from './layout.module.css';
import { Grid, Typography } from '@material-ui/core';
import MiniStats from '../Stats/MiniStats';
import { fetchCovidCount, fetchDailyCovidCount } from '../../api/mapApi';
import Divider from '@material-ui/core/Divider';
import cx from 'classnames';
import DailyChart from '../Charts/DailyChart';
import StateWiseChart from '../Charts/StateWiseChart';
import { sortBy } from '../../utils/commonHelper'
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
const Main = ({ classes, styles }) => {

    const [topData, setTopData] = useState([]);
    const [territoryData, setTerritoryData] = useState([]);
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCovidCount();
            if (data?.states) {
                setTopData(data);
                setTerritoryData(data.states)
            };
        }
        const fetchDailyData = async () => {
            const dailyData = await fetchDailyCovidCount();
            if (dailyData) {
                setDailyData(dailyData);
            };
        }
        fetchData();
        fetchDailyData();
    }, [])

    return (

        <div className={cx(layoutStyles.margin3, layoutStyles.paddingTop20)}>
            <Grid container spacing={3} mt={10} pt={10}>
                <Grid item xs={12} sm={6} pt={10}>
                    <div>
                        <Grid container spacing={2} justify="center" mt={2}>
                            <Grid item xs={10}>
                                <Typography gutterBottom variant="h5">
                                    COVID-19 Cases
                            </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <img height="40" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAt1BMVEVHcEwAJH0AJH0AJH0AJH3PGysAJH3u7u7u7u7PGyu3v9TWTFjPGysAJH3u7u7///8wTZUgP43f5O+vu9a/yN8PMYTq1NZwhLYQMoXRKDdgdq6Akr7f4efTNUPVQ1BQaKZofK7P1ufoxsmVosTgkpns4eLv8fefrc6zvNLkrLHmub2Pn8ZKY6AtSpLByNnXUFzdd4A8V5nQ1eB3ibbZXWjfhY3d1NtAW54ePYuGlr3banTin6XOyNSMRcFLAAAADHRSTlMAv2Dvz+8gYL8gz8/1nyU7AAACL0lEQVR4Xu3W15bbIBAGYCQ7TqOpuvdetpfU93+uMGiTMcGQzeIrH/0X9oUPn8ScYTC53NSp8/4DnxcMwjnV4ZxVKebliNIh8ySKX5iPn0vO+f3dKejuftGl9HHJvGm2tPOOdrdc5cGGHpaPVP/K/GmA9Kl6ppKur0zo6nqrfrop+QlIdsx3IiR+qcJOSYPJMTR5vlXkgqvMmZkOW7dZcizFJGLsMHhSK25hBULFZjakdDQD/8D+SpqJdJoZFSfA4SKEEN8U1sZ6QiUxbA3hNhDC7TIrX1KApoZEuBGEzJiQbCspb4dCkDyb9k2c0FfFKhLrjEMhu6OCIeyoQAg7KhDCjnoDJDuOjnp9H2FF7I76LwgrYncUHpHDQBm7ITUgfdp+TnxnDDtKQ8U3WAenDSGQZ3DgZpvCrogdogfYn0XHY0RJS8CfBgezIi5owlUWsI1nc7Dp7XYpHZVz5xlD6Cs8ubyB0WyPWiXpqb1wnLFeDyF47FZP7VPDn6v86LoaMhMiOxojy+/wTNd1pN/XAY2FGCO0G0IV3BekboTTkOz3JRY7MJcF1VCSnAna788AScnYagXfgVAiUjiIqUgCIbYXOvvgGskKkqFQe1VBq/a/ANnxQeP8N5TjHHTf+C4ILxwcoN4b3wv1RZ4LnO/eG98PrRlb+yG833yQrD58wfst4NB6/kNGb3Hs/5ARidlZEhPSPIfTJIS0GuFOo0VACn6nJjiQOAphophcbOrU+QVOD9KpWLgnDAAAAABJRU5ErkJggg==" alt="Flag of Australia" />
                            </Grid>
                        </Grid>
                    </div>
                    <Stats data={topData} />
                    <Grid item className={layoutStyles.paddingTop20}>
                        <MiniStats key={territoryData} data={territoryData} />
                    </Grid>
                    <Typography gutterBottom variant="subtitle2">
                        Select a state for more details
                            </Typography>
                    <Grid item xs={12} sm={12} lg={8} style={{ margin: 'auto' }} pt={10}>
                        <Map key={territoryData} data={territoryData} />
                    </Grid>
                    <Divider variant="middle" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StateTable key={territoryData} statesData={territoryData.sort(sortBy("active", "desc"))} />
                    <StateWiseChart chartData={territoryData} />
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <BarChart header="Daily New Cases in Australia" title={"New Cases"} labelArray={dailyData.map(x => x.reportDate)} dataArray={dailyData.map(x => x.newCases)} />
                    <LineChart header="Cumulative Cases in Australia" title={"Cumulative Cases"} labelArray={dailyData.map(x => x.reportDate)} dataArray={dailyData.map(x => x.confirmed)} />
                    <DailyChart />
                    <BarChart header="Deaths in Australia" title={"New Deaths"} labelArray={dailyData.map(x => x.reportDate)} dataArray={dailyData.map(x => x.newDeaths)} />
                </Grid>
            </Grid>
        </div >
    );
}

export default Main;