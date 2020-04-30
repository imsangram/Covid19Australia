import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { List, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
// import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function Sidebar(props) {
    const classes = useStyles();
    const inputRef = React.useRef(null);
    useEffect(() => {

        //Not to open drawer on first load
        if (props.toggleDrawer > 0)
            inputRef.current.click();

    }, [props.toggleDrawer]);

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) =>
        (event) => {
            if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            setState({ ...state, [anchor]: open });
        };

    const menuLinks = [
        { href: '/', text: 'Home', icon: 'home' },
        { href: '/global', text: 'Global', icon: 'language' },
        { href: '/about', text: 'About Us', icon: 'info' },
        { href: '/faq', text: 'FAQ', icon: 'live_help' }
    ];
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {
                    menuLinks.map((menu, index) => (
                        <ListItem key={index} >
                            {/* <ListItemIcon><HomeIcon /></ListItemIcon> */}
                            <ListItemIcon><Icon>{menu.icon}</Icon></ListItemIcon>
                            <Link to={menu.href}><ListItemText primary={menu.text} /></Link>
                        </ListItem>
                    )
                    )
                }
            </List>
            {/* <List>
                <ListItem>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <Link to='/'><ListItemText primary="Home" /></Link>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <ListItemIcon><PublicIcon /></ListItemIcon>
                    <Link to='/global'><ListItemText primary="Global" /></Link>
                </ListItem>
            </List> */}
        </div>
    );

    return (
        <div>
            <Button style={{ display: 'none' }} ref={inputRef} onClick={toggleDrawer('left', true)}>Open</Button>

            <SwipeableDrawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}>
                {list('left')}
            </SwipeableDrawer>
        </div>
    );
}
