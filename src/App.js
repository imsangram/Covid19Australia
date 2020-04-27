import React, { useEffect, useState } from 'react';
import { Cards, Charts, CountryPicker } from './components';
import { fetchData } from './api/index';
import styles from './App.module.css'

import AppHeader from './components/Layout/AppHeader';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import archia from './utils/FontAcrhia'
import './App.scss';
import Main from './components/Layout/Main';
import { Divider } from '@material-ui/core';

// Override the default Material UI Theme
const theme = createMuiTheme({

    typography: {
        fontFamily: 'Archia, Arial'
    },
    // palette: {
    //     primary: {
    //         main: "#bac778"
    //     },
    // },
    overrides: {
        // MuiToolbar: {
        //     regular: {
        //         backgroundColor: "orange",
        //         color: "#000000",
        //     }
        // },

        MuiCssBaseline: {
            '@global': {
                '@font-face': [archia],
            },
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const App = () => {

    useEffect(() => {
        const fetchedData = async () => {
            setData(await fetchData());
        };
        fetchedData();
    }, []);

    //set State
    const [data, setData] = useState({});
    const [country, setCountry] = useState('');



    const handlCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        setData(fetchedData);
        setCountry(country);
    }

    const classes = useStyles();

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppHeader />
                <Main classes={classes} styles={styles} />
                <Divider variant="middle" style={{ marginTop: '30px' }} />
                <div className={styles.container}>
                    <h2>Global COVID-19 Stats</h2>
                    <Cards data={data} />
                    <CountryPicker handleCountryChange={handlCountryChange} />
                    <Charts data={data} country={country} />
                </div>
            </ThemeProvider>
        </>)
}

export default App;