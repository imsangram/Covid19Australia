import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from './Sidebar/Sidebar';

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
                    <Typography variant="h6" className={classes.title}>
                        COVID-19 Australia
                     </Typography>
                </Toolbar>
            </AppBar>
            <Sidebar toggleDrawer={toggleDrawer} />
        </div>
    );
}
