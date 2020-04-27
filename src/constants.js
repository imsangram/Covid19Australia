export const STATE_CODES = {
    NSW: 'New South Wales',
    QLD: 'Queensland',
    SA: 'South Australia',
    TAS: 'Tasmania',
    VIC: 'Victoria',
    WA: 'Western Australia',
};

const reverseStateCodes = {};
Object.keys(STATE_CODES).map((key, index) => {
    reverseStateCodes[STATE_CODES[key]] = key;
    return null;
});
export const STATE_CODES_REVERSE = reverseStateCodes;

const stateCodes = [];
Object.keys(STATE_CODES).map((key, index) => {
    stateCodes.push({ code: key, name: STATE_CODES[key] });
    return null;
});
export const STATE_CODES_ARRAY = stateCodes;

