const settings = require('settings');

const taskUpgrade = (creep) => {

		// if upgrading but out of energy, stop upgrading
		if(creep.memory.upgrading && creep.carry.energy == 0) {
			creep.memory.upgrading = false;
			creep.say('🔄 harvest');
		}

		// if not upgrading but full of energy, start upgrading
		if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
			creep.memory.upgrading = true;
			creep.say('⚡ upgrade');
		}

		// if upgrading, upgrade!
		if(creep.memory.upgrading) {
			if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
			    if (settings.showUpgradePath) {
				    creep.moveTo(creep.room.controller, {visualizePathStyle: settings.upgradePathColour});
			    } else {
				    creep.moveTo(creep.room.controller);
			    }
			}
		}

};

module.exports = taskUpgrade;