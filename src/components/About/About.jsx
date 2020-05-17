import React from 'react';
import { Typography, Container, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

const About = () => {

    return (
        <>
            <Container fixed>
                <Typography component="div" style={{ height: '65vh' }} >
                    <h3>About us</h3>
                    <Divider />
                    <p>Hi, this is Sangram. </p>
                    <p>I am a software engineer by profession and I created this website to keep a track of active COVID-19 Cases in Australia. </p>
                    <p>I manage this website in my spare time and I try my best to keep it updated with the latest information.</p>
                    <p>Please go to <Link to="/faq">FAQ</Link> page to know more about the website.</p>
                    <br />
                    <p>
                        To get in touch with me, please drop a message on <a href='https://www.linkedin.com/in/sangram-nandkhile/'>LinkedIn</a>.
                    </p>
                </Typography>

            </Container>
        </>
    );
};

export default About;