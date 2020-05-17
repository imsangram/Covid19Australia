import React, { useState, useEffect, useMemo } from 'react';
import styles from './App.module.css'
import AppHeader from './components/Layout/AppHeader';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import archia from './utils/FontAcrhia';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { routerPages } from './router';
import AppFooter from './components/Layout/Footer/AppFooter';
import { CovidDataContext } from './components/Context/CovidDataContext';
import { fetchCovidCount } from './api/mapApi';
import ScrollToTop from './components/HighOrder/ScrollToTop';

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
    h6: {
        color: '#fff',
        textDecoration: 'none'
    },
    h1: {
        fontSize: 24
    },
    container: {
        position: 'relative',
        minHeight: '100vh'
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        // backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    }
}));


const App = () => {

    useEffect(() => {
        const fetchGlobalData = async () => {
            const data = await fetchCovidCount();
            if (data) {
                setGlobalCovidData(data);
            };
        }
        fetchGlobalData();
    }, [])

    const [globalCovidData, setGlobalCovidData] = useState(null);
    const providerValue = useMemo(() => ({ globalCovidData, setGlobalCovidData }), [globalCovidData, setGlobalCovidData]);
    const pages = routerPages;
    const classes = useStyles();

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <ScrollToTop />
                    <AppHeader classes={classes} />
                    <div>
                        <CovidDataContext.Provider value={providerValue}>
                            <AnimatedSwitch
                                atEnter={{ opacity: 0 }}
                                atLeave={{ opacity: 0 }}
                                atActive={{ opacity: 1 }}>
                                {pages.map((page, i) => {
                                    return (
                                        <Route
                                            exact
                                            path={page.pageLink}
                                            component={page.view}
                                            key={i}
                                        />
                                    );
                                })}
                            </AnimatedSwitch>
                        </CovidDataContext.Provider>
                    </div>
                    <AppFooter classes={classes} />
                </Router>
            </ThemeProvider>
        </>)
}

export default App;