import axios from 'axios';

export const fetchCovidCount = async () => {
    try {
        const { data } = await axios.get('https://covid19australia-api.herokuapp.com/api/australia.json');
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyCovidCount = async () => {
    try {
        const { data } = await axios.get('https://covid19australia-api.herokuapp.com/api/australia_daily.json');
        return data;
    } catch (error) {
        console.log(error);
    }
}