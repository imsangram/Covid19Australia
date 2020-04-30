import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from './Sidebar/Sidebar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    h6: {
        color: '#fff',
        textDecoration: 'none'
    },
    h1: {
        fontSize: 24
    }
}));


export default function AppHeader() {

    const classes = useStyles();
    const [toggleDrawer, setToggleDrawer] = useState(0);
    const onClickToggle = () => {
        setToggleDrawer(toggleDrawer + 1)
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={() => onClickToggle()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h1" className={classes.h1}>
                        <Link className={classes.h6} to='/'>COVID-19 Australia</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Sidebar toggleDrawer={toggleDrawer} />
        </div>
    );
}
