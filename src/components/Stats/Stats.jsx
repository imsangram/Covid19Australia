import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Icon } from '@material-ui/core';
import { green, red, purple, blue } from '@material-ui/core/colors';
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


    const { confirmed, recovered, deaths, active, newConfirmed, newRecovered, newDeaths, newActive, lastUpdated } = topCovidData;
    return (
        <div id={"states"} className={styles.container}>
            <div>
                <Grid container spacing={2} justify="center" mt={2} className={styles.marginTop10}>
                    <Grid item xs={10}>
                        <Typography gutterBottom variant="h5">
                            Cases in Australia
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <img height="40" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAt1BMVEVHcEwAJH0AJH0AJH0AJH3PGysAJH3u7u7u7u7PGyu3v9TWTFjPGysAJH3u7u7///8wTZUgP43f5O+vu9a/yN8PMYTq1NZwhLYQMoXRKDdgdq6Akr7f4efTNUPVQ1BQaKZofK7P1ufoxsmVosTgkpns4eLv8fefrc6zvNLkrLHmub2Pn8ZKY6AtSpLByNnXUFzdd4A8V5nQ1eB3ibbZXWjfhY3d1NtAW54ePYuGlr3banTin6XOyNSMRcFLAAAADHRSTlMAv2Dvz+8gYL8gz8/1nyU7AAACL0lEQVR4Xu3W15bbIBAGYCQ7TqOpuvdetpfU93+uMGiTMcGQzeIrH/0X9oUPn8ScYTC53NSp8/4DnxcMwjnV4ZxVKebliNIh8ySKX5iPn0vO+f3dKejuftGl9HHJvGm2tPOOdrdc5cGGHpaPVP/K/GmA9Kl6ppKur0zo6nqrfrop+QlIdsx3IiR+qcJOSYPJMTR5vlXkgqvMmZkOW7dZcizFJGLsMHhSK25hBULFZjakdDQD/8D+SpqJdJoZFSfA4SKEEN8U1sZ6QiUxbA3hNhDC7TIrX1KApoZEuBGEzJiQbCspb4dCkDyb9k2c0FfFKhLrjEMhu6OCIeyoQAg7KhDCjnoDJDuOjnp9H2FF7I76LwgrYncUHpHDQBm7ITUgfdp+TnxnDDtKQ8U3WAenDSGQZ3DgZpvCrogdogfYn0XHY0RJS8CfBgezIi5owlUWsI1nc7Dp7XYpHZVz5xlD6Cs8ubyB0WyPWiXpqb1wnLFeDyF47FZP7VPDn6v86LoaMhMiOxojy+/wTNd1pN/XAY2FGCO0G0IV3BekboTTkOz3JRY7MJcF1VCSnAna788AScnYagXfgVAiUjiIqUgCIbYXOvvgGskKkqFQe1VBq/a/ANnxQeP8N5TjHHTf+C4ILxwcoN4b3wv1RZ4LnO/eG98PrRlb+yG833yQrD58wfst4NB6/kNGb3Hs/5ARidlZEhPSPIfTJIS0GuFOo0VACn6nJjiQOAphophcbOrU+QVOD9KpWLgnDAAAAABJRU5ErkJggg==" alt="Flag of Australia" />
                    </Grid>
                </Grid>
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