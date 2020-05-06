import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import styles from './Stats.module.css';
import cx from 'classnames';

const MiniStats = (props) => {

    const [topData, setTopData] = useState([]);
    const [selectedState, setSelectedState] = useState({});
    let mainData = [];

    useEffect(() => {
        if (props?.data && props.data.length > 0) {
            setTopData(props?.data);
            mainData = props.data;
            setSelectedState(props.data[0]);
        }

        const statePaths = document.querySelectorAll('#australiaMap path');
        statePaths.forEach((img) => {
            img.addEventListener('mouseover', (e) => showData(e));
        })
    }, [])

    function showData(e) {
        const st = mainData.filter(x => x.id === e.target.id)[0];
        setSelectedState({ ...st });
    }


    return (
        <>
            {
                selectedState?.name ?

                    (<>
                        <Grid container spacing={1} p={5}>
                            <Grid item xs={12}>
                                <Typography variant="body1" style={{ fontWeight: '600' }}>{selectedState.name}</Typography>
                                <Typography variant="body2"></Typography>
                            </Grid>
                            <Grid item xs={3} className={cx(styles.bgnegative, styles.negative, styles.roundBorder)}>
                                <Typography variant="body2">Confirmed</Typography>
                                <Typography variant="h6">{selectedState.confirmed}</Typography>
                            </Grid>
                            <Grid item xs={3} className={cx(styles.bgneutral, styles.roundBorder)}>
                                <Typography variant="body2">Deaths</Typography>
                                <Typography variant="h6">{selectedState.deaths}</Typography>
                            </Grid>
                            <Grid item xs={3} className={cx(styles.bgactive, styles.active, styles.roundBorder)}>
                                <Typography variant="body2">Active</Typography>
                                <Typography variant="h6">{selectedState.active}</Typography>
                            </Grid>
                            <Grid item xs={3} className={cx(styles.bgpositive, styles.positive, styles.roundBorder)}>
                                <Typography color="inherit" variant="body2">Recovered</Typography>
                                <Typography color="initial" variant="h6">{selectedState.recovered}</Typography>
                            </Grid>
                        </Grid>
                    </>)
                    : 'Loading ...'
            }
        </>
    );
};

export default MiniStats;