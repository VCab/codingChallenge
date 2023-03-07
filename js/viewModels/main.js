import { Client } from "../models/model.js";
import { CONSTANTS } from "../constants.js";

const client = new Client();
client.load();

/**
 * Returns a boolean depending of if the rent amount is within the allowed range or not
 * @param {Integer} rent_amount
 * @param {String} rent_period
 * @returns {Boolean}
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
 * @param {Integer} rent_amount 
 * @returns {Boolean}
 */
function validateRentAmount(rent_amount) {
    return Number.isInteger(rent_amount) && rent_amount >= 1;
}

/**
 * If the branch (organization_unit) does not have a config,
 * the function recursively checks the parent entities until it finds one that has it
 * @param {*} organisation_unit 
 * @returns {}
 */
function checkIfParentHasConfigurationObject(organisation_unit) {

    if (!organisation_unit.hasConfig) {
        checkHasConfigurationObject(organisation_unit.parent);
    }
    else {
        return organisation_unit;
    }

}

/**
 * 
 * @param {Integer} rent_amount
 * @param {String} rent_period
 * @param {Object} organisation_unit
 * @returns {Integer}
 */
function calculate_membership_fee(rent_amount, rent_period, organisation_unit) {
    const rentAmount = Number(rent_amount);
    const weeklyRent = rent_period === 'week' ? rentAmount : (rentAmount / 4);
    let membershipFee = Number();

    if (!validateRentAmount(rentAmount)) {
        throw new Error('Rent Amount inserted is not allowed. Wrong format or range inputed.');
    }

    if (validateRentAmountRange(rentAmount, rent_period)) {
        throw new Error('Rent Amount is outside the allowed range.');
    }

    if (!organisation_unit.hasConfig) {
        organisation_unit = checkIfParentHasConfigurationObject(organisation_unit.parent);
    }

    const VAT = weeklyRent * CONSTANTS.VAT_PERCENTAGE;

    if (organisation_unit.hasConfig && organisation_unit.config.has_fixed_membership_fee) {
        membershipFee = organisation_unit.config.fixed_membership_fee_amount;
    } else {
        if (rentAmount < CONSTANTS.MINIMUM_RENT_ALLOWED) {
            const minimumFee = CONSTANTS.MINIMUM_RENT_ALLOWED + VAT;

            membershipFee = minimumFee;
        }

        membershipFee = weeklyRent + VAT;

    }

    console.log(`${organisation_unit.name} fee: ${membershipFee}`);
    return membershipFee;
}

function calculateMemberships() {
    client.divisions.forEach(division => { division.areas.forEach(area => area.branches.forEach(branch => calculate_membership_fee(200, 'month', branch))) })
}

window.calculateMemberships = calculateMemberships;
