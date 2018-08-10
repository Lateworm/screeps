const settings = require('settings');

const vetUpgrade = (creep) => {
	if(settings.upgrade
		&& creep.carry.energy == creep.carryCapacity
	) {
		creep.memory.task = 'upgrade';
		if(settings.say){creep.say('upgrade')};
	}
};

module.exports = vetUpgrade;