import React from 'react';
import { Typography, Grid, Button, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import GitHunIcon from '@material-ui/icons/GitHub';
import logo from '../../../assets/svg/react-logo.svg';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}{new Date().getFullYear()}

            {'.'}
        </Typography>
    );
}

const AppFooter = ({ classes }) => {
    return (
        <>
            <Divider />
            <footer className={classes.footer}>
                <Grid container spacing={0}>
                    <Grid item xs={6} md={3} lg={3}>
                        Fork us on <Button
                            variant="contained"
                            style={{ background: '#000', color: '#fff' }}
                            startIcon={<GitHunIcon />} >
                            <a rel="noopener noreferrer" className={classes.link} href="https://github.com/imsangram/Covid19Australia-ReactJS" target="_blank">Github</a>
                        </Button>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                        Made with <Button style={{ background: '#000', color: '#fff' }}        >
                            <img height={20} src={logo} alt={"react js logo"}></img> React Js
                    </Button>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                        {/* Fork us on <a href="https://github.com/imsangram/Covid19Australia-ReactJS" target="_blank"><GitHunIcon /></a> */}
                        <Link to='/faq'>F.A.Q.</Link>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                        <Copyright />
                    </Grid>
                </Grid>
            </footer>
        </>
    );
};

export default AppFooter;