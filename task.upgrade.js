const settings = require('settings');

const taskUpgrade = (creep) => {

	if(creep.memory.task !== 'upgrade' && creep.carry.energy == creep.carryCapacity) {
		creep.memory.task = 'upgrade';
		if(settings.say){creep.say('upgrade')};
	}

	const target = creep.room.controller

	// TODO: might need to handle a fully upgraded controller at some point
	if(creep.memory.task === 'upgrade') {

		

		if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
			if (settings.showUpgradePath) {
				creep.moveTo(target, {visualizePathStyle: {stroke: settings.upgradePathColour}});
			} else {
				creep.moveTo(target);
			}
		}

	}
};

module.exports = taskUpgrade;
