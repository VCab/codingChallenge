import { Client } from "../models/model.js";

const client = new Client();
/**
 * Returns a boolean depending of if the rent amount is within the allowed range or not
 * @param {Integer} rent_amount
 * @param {String} rent_period
 * @returns {Boolean}
 */
function validateRentAmount(rent_amount, rent_period) {
    if (rent_period === 'week') {
        return rent_amount < 25 || rent_amount > 2000;
    } else {
        return rent_amount < 110 || rent_amount > 8660;
    }
}

function checkHasConfigurationObject() {
    return true
    // if (condition) {
    //     recurse();
    // }
    // else {
    //     // stop calling recurse()
    // }

    // recurse();
}

/**
 * 
 * @param {Integer} rent_amount
 * @param {String} rent_period
 * @param {Object} organisation_unit
 * @returns {Integer}
 */
function calculate_membership_fee(rent_amount, rent_period, organisation_unit) {
    const VATPercentage = 0.2;
    const rentAmount = Number(rent_amount);
    const weeklyRent = rent_period === 'week' ? rentAmount : (rentAmount / 4);
    const minimumRentAllowed = 120;
    let membershipFee = Number();

    if (validateRentAmount(rentAmount, rent_period)) {
        throw new Error('Rent Amount is outside the allowed range.');
    }

    if (!organisation_unit.hasConfig) {
        return checkHasConfigurationObject();
    }

    const VAT = weeklyRent * VATPercentage;

    if (organisation_unit.hasConfig && organisation_unit.config.has_fixed_membership_fee) {

        membershipFee = organisation_unit.config.fixed_membership_fee_amount
        console.log(`${organisation_unit.name}: ${membershipFee}`);
        return membershipFee;
    }
    else {
        if (rentAmount < minimumRentAllowed) {
            const minimumFee = minimumRentAllowed + VAT;

            membershipFee = minimumFee

            console.log(`${organisation_unit.name}: ${membershipFee}`);
            return membershipFee;
        }

        membershipFee = weeklyRent + VAT;

        console.log(`${organisation_unit.name}: ${membershipFee}`);
        return membershipFee;
    }
}


client.divisions.forEach(division => { division.areas.forEach(area => area.branches.forEach(branch => log(calculate_membership_fee(200, 'month', branch)))) })


