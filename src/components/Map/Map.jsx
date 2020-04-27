import React, { useEffect, useState } from 'react';
import red from '@material-ui/core/colors/red';
import { ReactComponent as AusMap } from '../../assets/svg/au_map.svg';
import { Paper, Box } from '@material-ui/core';


const Map = (props) => {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const states = props.data;
            if (states) {
                const maxCases = Math.max.apply(Math, states.map(function (o) { return o.confirmed; }))
                setTotal(Math.ceil(maxCases / 100) * 100);

                states.forEach(state => {
                    let perc = (state.confirmed * 900 / maxCases);
                    let shade = Math.ceil(perc / 100) * 100;
                    let hexShade = red[shade];
                    document.getElementById(state.id).style.fill = hexShade;
                });


            }
        }
        fetchData();
    }, [props.data])


    return (
        <>
            <AusMap />
            <Paper style={{ background: 'linear-gradient( to right,#ffebee, #b71c1c )', height: '20px' }}>

            </Paper>
            <div style={{ width: '100%' }}>
                <Box display="flex" p={1}>
                    {
                        [6, 5, 4, 3, 2, 1].map(x => (<Box key={x} p={1} flexGrow={1}>{Math.ceil((total / x) / 100) * 100}</Box>))
                    }
                </Box>
            </div>
        </>
    );
};

export default Map;