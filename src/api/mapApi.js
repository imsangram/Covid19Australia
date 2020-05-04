import axios from 'axios';
import { API_URL, DYNAMIC_API_URL } from '../constants';
export const fetchCovidCount = async () => {
    try {
        const { data } = await axios.get(`${DYNAMIC_API_URL}/api/australia.json`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyCovidCount = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/api/australia_daily.json`);
        return data;
    } catch (error) {
        console.log(error);
    }
}