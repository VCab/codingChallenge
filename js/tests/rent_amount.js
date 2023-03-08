import * as Assert from 'assert';

function validateRentAmount(rent_amount) {
    return Number.isInteger(rent_amount) && rent_amount >= 1;
}

describe('Validate Rent Amount', function () {
    it('Should return false if the rent amount is not an Integer', function () {

        const result = validateRentAmount('string');

        Assert.equal(result, false);
    });

    it('Should return false if the rent amount is lower than 1', function () {

        const result = validateRentAmount(0);

        Assert.equal(result, false);
    });
});
