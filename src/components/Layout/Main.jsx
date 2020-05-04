import React, { useEffect, useState } from 'react';
import Map from '../Map/Map'
import StateTable from '../../components/Tables/StateTable';
import Stats from '../Stats/Stats';
import layoutStyles from './layout.module.css';
import { Grid, Typography } from '@material-ui/core';
import MiniStats from '../Stats/MiniStats';
import { fetchCovidCount } from '../../api/mapApi';
import Divider from '@material-ui/core/Divider';
import cx from 'classnames';
import DailyChart from '../Charts/DailyChart';
import StateWiseChart from '../Charts/StateWiseChart';
const Main = ({ classes, styles }) => {

    const [topData, setTopData] = useState([]);
    ///const [stateLevelData, setStateLevelData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCovidCount();
            if (data?.states) {
                setTopData(data.states);
                //setStateLevelData({ ...data.states[0] });
            };
        }
        fetchData();
    }, [])

    return (

        <div className={cx(layoutStyles.margin3, layoutStyles.paddingTop20)}>
            <Grid container spacing={3} mt={10} pt={10}>
                <Grid item xs={12} sm={6} pt={10}>
                    <Stats />
                    <Grid item className={layoutStyles.paddingTop20}>
                        <MiniStats key={topData} data={topData} />
                    </Grid>
                    <Typography gutterBottom variant="subtitle2">
                        Select a state for more details
                            </Typography>
                    <Grid item xs={12} sm={12} lg={8} style={{ margin: 'auto' }} pt={10}>
                        <Map key={topData} data={topData} />
                    </Grid>
                    <Divider variant="middle" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StateTable key={topData} statesData={topData} />
                    <StateWiseChart chartData={topData} />
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <DailyChart />
                </Grid>
            </Grid>
        </div >
    );
}

export default Main;