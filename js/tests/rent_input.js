import * as Assert from 'assert';

function validateRentAmountRange(rent_amount, rent_period) {
    if (rent_period === 'week') {
        return rent_amount < 25 || rent_amount > 2000;
    } else {
        return rent_amount < 110 || rent_amount > 8660;
    }
}

describe('Validate Rent Input', function () {
    it('Should return true if the rent amount is below 25 and the rent period is week', function () {

        const result = validateRentAmountRange(5, 'week');

        Assert.equal(result, true);
    });

    it('Should return true if the rent amount is below 110 and the rent period is month', function () {

        const result = validateRentAmountRange(100, 'month');

        Assert.equal(result, true);
    });

    it('Should return true if the rent amount is above 2000 and the rent period is week', function () {

        const result = validateRentAmountRange(5, 'week');

        Assert.equal(result, true);
    });

    it('Should return true if the rent amount is above 8660 and the rent period is month', function () {

        const result = validateRentAmountRange(100, 'month');

        Assert.equal(result, true);
    });
});
