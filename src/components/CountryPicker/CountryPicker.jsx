import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api'

const CountryPicker = ({ handleCountryChange }) => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        const getCountries = async () => {
            setCountries(await fetchCountries())
        }
        getCountries();
    }, [setCountries]);

    return (<div>
        <FormControl className={styles.FormControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {
                    countries ? countries.map((country, index) => <option key={index} value={country}>{country}</option>) : null
                }
            </NativeSelect>
        </FormControl>
    </div>)
}

export default CountryPicker