import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Stats.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';
import { timeSince } from '../../utils/commonHelper.js';
import { fetchCovidCount } from '../../api/mapApi';
import Skeleton from '@material-ui/lab/Skeleton'

const Stats = () => {
    // if (!confirmed) {
    //     return "Loading ..."
    // }

    const [topCovidData, setTopCovidData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCovidCount();
            if (data) {
                setTopCovidData(data);
            };
        }
        fetchData();
    }, [])


    const { confirmed, recovered, deaths, newConfirmed, newRecovered, newDeaths, lastUpdated } = topCovidData;
    return (
        <div id={"states"} className={styles.container}>
            <div>
                <Typography gutterBottom variant="h5">
                    Cases in Australia
                </Typography>
            </div>
            <Grid container spacing={2} justify="center" mt={2} className={styles.marginTop10}>

                {
                    confirmed ?
                        (<><Grid item component={Card} xs className={cx(styles.card, styles.total)}>
                            <CardContent className={styles.padding5} align="center">
                                <Typography color="textSecondary" variant="subtitle2" gutterBottom>Total</Typography>
                                <Typography variant="h5" className="red" >
                                    <CountUp start={0} end={confirmed} duration={2.5} separator="," />
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    + {newConfirmed}
                                </Typography>
                            </CardContent>
                        </Grid>
                            <Grid item component={Card} xs className={cx(styles.card, styles.infected)}>
                                <CardContent className={styles.padding5} align="center">
                                    <Typography color="textSecondary" variant="subtitle2" gutterBottom>Active</Typography>
                                    <Typography variant="h5" >
                                        <CountUp start={0} end={(confirmed - (recovered + deaths))} duration={2.5} separator="," />
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {/* + {newInfected}  */}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item component={Card} xs className={cx(styles.card, styles.recovered)}>
                                <CardContent className={styles.padding5} align="center">
                                    <Typography color="textSecondary" variant="subtitle2" gutterBottom>Recovered</Typography>
                                    <Typography variant="h5" className="green" >
                                        <CountUp start={0} end={recovered} duration={2.5} separator="," />
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        + {newRecovered}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item component={Card} xs className={cx(styles.card, styles.deaths)}>
                                <CardContent className={styles.padding5} align="center">
                                    <Typography color="textSecondary" variant="subtitle2" gutterBottom>Deaths</Typography>
                                    <Typography variant="h5" >
                                        <CountUp start={0} end={deaths} duration={2.5} separator="," />
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        + {newDeaths}
                                    </Typography>
                                </CardContent>
                            </Grid></>
                        ) : <Skeleton variant="rect" height={100} />
                }

            </Grid>
            <div style={{ marginTop: '10px' }}>
                <Typography variant="caption" align='right'>
                    Updated {timeSince(Date.parse(lastUpdated))}
                </Typography>
            </div>
        </div>
    )
}

export default Stats;