export function Client() {
    const self = this;

    self.name = String();
    self.config = new Config();
    self.type = 'Client';
    self.hasConfig = Boolean();

    self.divisions = [];

    self.map = function (client) {
        self.name = client.name;
        self.config = self.config.map(client.config);
        self.hasConfig = Boolean(client.config);
        self.divisions = client.divisions.map(division => new Division(self).map(division))
    }

    self.load = function () {
        self.map(serverData());
    }

}

function Division(client) {
    const self = this;

    self.name = String();
    self.config = new Config();
    self.type = 'Division';
    self.hasConfig = Boolean();

    self.areas = [];
    self.parent = client;

    self.map = function (division) {
        self.name = division.name;
        self.config = self.config.map(division.config);
        self.hasConfig = Boolean(division.config)
        self.areas = division.areas.map(area => new Area(self).map(area));

        return self;
    }
}

function Area(division) {
    const self = this;

    self.name = String();
    self.config = null;
    self.type = 'Area';

    self.branches = [];
    self.parent = division;

    self.hasConfig = function () {
        return self.config !== null;
    }

    self.map = function (area) {
        self.name = area.name;
        self.config = new Config().map(area.config);
        self.hasConfig = Boolean(area.config);
        self.branches = area.branches.map(branch => new Branch(self).map(branch));

        return self;
    }
}

function Branch(area) {
    const self = this;

    self.name = String();
    self.config = new Config();
    self.type = 'Branch';
    self.hasConfig = Boolean();

    self.parent = area;

    self.map = function (branch) {
        self.name = branch.name;
        self.config = self.config.map(branch.config);
        self.hasConfig = Boolean(branch.config);

        return self;
    }
}

function Config() {
    const self = this;

    self.has_fixed_membership_fee = Boolean();
    self.fixed_membership_fee_amount = Number();

    self.map = function (config) {
        self.has_fixed_membership_fee = config?.has_fixed_membership_fee;
        self.fixed_membership_fee_amount = config?.fixed_membership_fee_amount;

        return self;
    }
}

function serverData() {
    return {
        'name': 'client',
        'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 },
        'divisions': [
            {
                'name': 'division_a',
                'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 },
                'areas': [
                    {
                        'name': 'area_a', 'config': { 'has_fixed_membership_fee': true, 'fixed_membership_fee_amount': 45000 },
                        'branches': [
                            { 'name': 'branch_a', 'config': null },
                            { 'name': 'branch_b', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 } },
                            { 'name': 'branch_c', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 } },
                            { 'name': 'branch_d', 'config': null }
                        ]
                    },
                    {
                        'name': 'area_b', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 },
                        'branches': [
                            { 'name': 'branch_e', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 } },
                            { 'name': 'branch_f', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 } },
                            { 'name': 'branch_g', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 } },
                            { 'name': 'branch_h', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 } }
                        ]
                    }
                ]
            },
            {
                'name': 'division_b',
                'config': { 'has_fixed_membership_fee': true, 'fixed_membership_fee_amount': 35000 },
                'areas': [
                    {
                        'name': 'area_c', 'config': { 'has_fixed_membership_fee': true, 'fixed_membership_fee_amount': 45000 },
                        'branches': [
                            { 'name': 'branch_i', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 } },
                            { 'name': 'branch_j', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 } },
                            { 'name': 'branch_k', 'config': { 'has_fixed_membership_fee': true, 'fixed_membership_fee_amount': 25000 } },
                            { 'name': 'branch_l', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 } }
                        ]
                    },
                    {
                        'name': 'area_d', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 },
                        'branches': [
                            { 'name': 'branch_m', 'config': null },
                            { 'name': 'branch_n', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 } },
                            { 'name': 'branch_o', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 } },
                            { 'name': 'branch_p', 'config': { 'has_fixed_membership_fee': false, 'fixed_membership_fee_amount': 0 } }
                        ]
                    }
                ]
            }
        ]
    }
}
