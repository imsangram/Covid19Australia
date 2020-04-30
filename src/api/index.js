import axios from 'axios';
import { GLOBAL_DATA_API_URL } from '../constants';

export const fetchData = async (country) => {
    const dynamicurl = country ? `${GLOBAL_DATA_API_URL}/countries/${country}` : GLOBAL_DATA_API_URL;
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(dynamicurl);

        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        }

    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${GLOBAL_DATA_API_URL}/daily`);
        const modifiedData = data.map(d => ({
            confirmed: d.confirmed.total,
            deaths: d.deaths.total,
            date: d.reportDate
        }));
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    const url = "https://covid19.mathdro.id/api";
    try {
        const countries = await axios.get(`${url}/countries`);
        return countries.data.countries.map(x => x.name);
    }
    catch (error) {
        console.log(error);
    }
}
