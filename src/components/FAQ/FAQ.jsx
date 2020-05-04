import React from 'react';
import { Typography, Container, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function FAQ() {

    return (
        <>
            <Container fixed>
                <Typography component="div" >
                    <h3>F.A.Q.</h3>
                    <Divider />
                    <h4>Are you official?</h4>
                    <p>No.</p>
                    <p>This is a personal project and is in no way affliated with the Australian Government or any other Organization. All the latest reliable information for Australia can be found at https://www.australia.gov.au/</p>
                    <h4>What is the purpose of the website?</h4>
                    <p>To make it easier to keep track of COVID-19 cases in Australia.</p>
                    <h4>Where do you get your data from ?</h4>
                    <p>We get data from 2 main sources.</p>
                    <ol>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Australia">Wikipedia</a>
                        </li >
                        <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/mathdroid/covid-19-api">JSON API</a> based on data from John Hopkins University CSSE</li>
                    </ol>
                    <h4>Is data real-time and accurate?</h4>
                    <p>We try our best to keep the data updated with the latest information but there could be a slight delay in reporting the latest data. </p>
                    <p>As the data comes from different government official websites, Wikipedia, and social media handles, it takes some time to update the latest information. </p>

                    <h4>Who are you?</h4>
                    <p>Please visit <Link to='/about'>About us</Link> page.</p>
                </Typography>

            </Container>
        </>
    );
}
