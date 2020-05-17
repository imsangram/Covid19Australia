import React from 'react';
import { Card, CardContent, Typography, Grid, Icon } from '@material-ui/core';
import { green, red, purple, blue } from '@material-ui/core/colors';
import styles from './Stats.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';
import { timeSince } from '../../utils/commonHelper.js';
import Skeleton from '@material-ui/lab/Skeleton'

const Stats = ({ data }) => {

    const { confirmed, recovered, deaths, active, newConfirmed, newRecovered, newDeaths, newActive, lastUpdated } = data || {};

    return (
        <>
            <div className={styles.container}>
                <Grid container spacing={2} justify="center" mt={2} className={styles.marginTop10}>
                    {
                        confirmed ?
                            (<>
                                <Grid item component={Card} xs className={cx(styles.card, styles.total)}>
                                    <CardContent className={styles.padding5} align="center">
                                        <Typography color="textSecondary" variant="subtitle2" gutterBottom>Total</Typography>
                                        <Typography variant="h5" className="red" >
                                            <CountUp start={0} end={confirmed} duration={2.5} separator="," />
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {newConfirmed > 0 ? '+' + newConfirmed : ''}
                                        </Typography>
                                        <Icon fontSize="large" style={{ color: purple['A100'] }}>assessment</Icon>
                                    </CardContent>
                                </Grid>
                                <Grid item component={Card} xs className={cx(styles.card, styles.infected)}>
                                    <CardContent className={styles.padding5} align="center">
                                        <Typography color="textSecondary" variant="subtitle2" gutterBottom>Active</Typography>
                                        <Typography variant="h5" >
                                            <CountUp start={0} end={active} duration={2.5} separator="," />
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {newActive > 0 ? '+' + newActive : ''}
                                        </Typography>
                                        <Icon fontSize="large" style={{ color: blue[500] }}>local_hospital</Icon>
                                    </CardContent>
                                </Grid>
                                <Grid item component={Card} xs className={cx(styles.card, styles.recovered)}>
                                    <CardContent className={styles.padding5} align="center">
                                        <Typography color="textSecondary" variant="subtitle2" gutterBottom>Recovered</Typography>
                                        <Typography variant="h5" className="green" >
                                            <CountUp start={0} end={recovered} duration={2.5} separator="," />
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {newRecovered > 0 ? '+' + newRecovered : ''}
                                        </Typography>
                                        <Icon fontSize="large" style={{ color: green['A400'] }}>accessibility</Icon>
                                    </CardContent>
                                </Grid>
                                <Grid item component={Card} xs className={cx(styles.card, styles.deaths)}>
                                    <CardContent className={styles.padding5} align="center">
                                        <Typography color="textSecondary" variant="subtitle2" gutterBottom>Deaths</Typography>
                                        <Typography variant="h5" >
                                            <CountUp start={0} end={deaths} duration={2.5} separator="," />
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {newDeaths > 0 ? '+' + newDeaths : ''}
                                        </Typography>
                                        <Icon fontSize="large" style={{ color: red[500] }}>notifications_active</Icon>
                                    </CardContent>
                                </Grid>
                            </>
                            ) :
                            <>
                                {Array(4).fill(0).map((x, i) => (
                                    <Grid key={i} item component={Card} xs className={styles.card}>
                                        <Skeleton variant="rect" height={140} animation="wave" />
                                    </Grid>)
                                )}
                            </>
                    }
                    <>

                    </>
                </Grid>
                {
                    lastUpdated ?
                        <div style={{ marginTop: '10px' }}>
                            <Typography variant="caption" align='right'>
                                Updated {timeSince(Date.parse(lastUpdated))}
                            </Typography>
                        </div> : ''
                }
            </div>
        </>)
}

export default Stats;