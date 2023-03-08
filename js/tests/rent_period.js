import * as Assert from 'assert';

function validateRentPeriod(rent_period) {
    const rentPeriodsAllowed = ['week', 'month'];

    return typeof rent_period === 'string' && rentPeriodsAllowed.includes(rent_period);
}

describe('Validate Rent Period', function () {
    it('Should return false if the rent period is not a string', function () {

        const result = validateRentPeriod(2);

        Assert.equal(result, false);
    });

    it('Should return false if the rent period is a string but not "week" or "month"', function () {

        const result = validateRentPeriod('wee');

        Assert.equal(result, false);
    });
});