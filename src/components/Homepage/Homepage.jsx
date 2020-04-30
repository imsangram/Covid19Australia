import React from 'react';
import Main from '../Layout/Main';
import { Divider } from '@material-ui/core';
const Homepage = (props) => {
    return (
        <>
            <Main {...props} />
            <Divider variant="middle" style={{ marginTop: '30px' }} />
        </>
    );
};

export default Homepage;