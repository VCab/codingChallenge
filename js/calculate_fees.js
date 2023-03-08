import { CONSTANTS } from './constants.js';

/**
 * Returns a boolean depending on if the rent amount is within the allowed range or not
 * @param {integer} rent_amount
 * @param {string} rent_period
 * @returns {boolean} result of the rent amount range validation
 */
function validateRentAmountRange(rent_amount, rent_period) {
    if (rent_period === 'week') {
        return rent_amount < 25 || rent_amount > 2000;
    } else {
        return rent_amount < 110 || rent_amount > 8660;
    }
}

/**
 * Returns a boolean depending on if the data type for the rent amount is correct or not
 * @param {integer} rent_amount 
 * @returns {boolean} result of the result of the rent amount validation
 */
function validateRentAmount(rent_amount) {
    return Number.isInteger(rent_amount) && rent_amount >= 1;
}

/**
 * Returns a boolean depending on if the data type for the rent period is correct and it's values are "week" or "month"
 * @param {string} rent_period 
 * @returns {boolean} result of the result of the rent period validation
 */
function validateRentPeriod(rent_period) {
    const rentPeriodsAllowed = ['week', 'month'];

    return typeof rent_period === 'string' && rentPeriodsAllowed.includes(rent_period);
}

/**
 * If the branch (organization_unit) does not have a config,
 * the function recursively checks the parent entities until it finds one that has it
 * @param {function} organisation_unit it's an instance of a branch 
 * @returns {function} instance of the parent that has the config object
 */
function checkIfParentHasConfigurationObject(organisation_unit) {
    if (!organisation_unit.hasConfig) {
        checkHasConfigurationObject(organisation_unit.parent);
    } else {
        return organisation_unit;
    }
}

/**
 * Function to calculate the fee that each branch of a client needs to pay
 * @param {integer} rent_amount
 * @param {string} rent_period
 * @param {object} organisation_unit
 * @returns {integer} calculated value of the membership fee for a given branch
 */
export function calculate_membership_fee(rent_amount, rent_period, organisation_unit) {
    const weeklyRent = rent_period === 'week' ? rent_amount : (rent_amount / 4);
    const VAT = weeklyRent * CONSTANTS.VAT_PERCENTAGE;
    let membershipFee;

    if (!validateRentAmount(rent_amount)) {
        throw new Error('Rent Amount inserted is not allowed. Wrong format or range inserted.');
    }

    if (!validateRentPeriod(rent_period)) {
        throw new Error('Rent Period inserted is not allowed. Allowed values are "week" or "month".');
    }

    if (validateRentAmountRange(rent_amount, rent_period)) {
        throw new Error('Rent Amount is outside the allowed range.');
    }

    if (!organisation_unit.hasConfig) {
        organisation_unit = checkIfParentHasConfigurationObject(organisation_unit.parent);
    }

    if (organisation_unit.hasConfig && organisation_unit.config.has_fixed_membership_fee) {
        return membershipFee = organisation_unit.config.fixed_membership_fee_amount;
    } else {
        if (rent_amount < CONSTANTS.MINIMUM_RENT_ALLOWED) {
            const minimumFee = CONSTANTS.MINIMUM_RENT_ALLOWED + VAT;

            return membershipFee = minimumFee;
        }

        return membershipFee = weeklyRent + VAT;
    }
}
