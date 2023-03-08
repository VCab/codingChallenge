import { Client } from './js/models/model.js';
import { calculate_membership_fee } from './js/calculate_fees.js';

const client = new Client();
client.load();


client.divisions.forEach(division => {
    division.areas.forEach(area => area.branches.forEach(branch =>
        console.log(`${branch.name} fee: ${calculate_membership_fee(1000, 'month', branch)}`)
    ))
});
