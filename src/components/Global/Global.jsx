import React, { useEffect, useState } from 'react';
import Cards from '../Cards/Cards';
import CountryPicker from '../CountryPicker/CountryPicker';
import Charts from '../Charts/Charts';
import { fetchData } from '../../api/index';
import styles from './Global.module.css'

const Global = () => {

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

    return (
        <>
            <div className={styles.container}>
                <h2>Global COVID-19 Stats</h2>
                <Cards data={data} />
                <CountryPicker handleCountryChange={handlCountryChange} />
                <Charts data={data} country={country} />
            </div>
        </>
    );
};

export default Global;