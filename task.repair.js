const settings = require('settings');

const taskRepair = (creep) => {
	if(creep.memory.repairing && creep.carry.energy == 0) {
		creep.memory.repairing = false;
		creep.say('💲');
	}

	if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
		creep.memory.repairing = true;
		creep.say('🛠');
	}

  const targets = creep.room.find(FIND_STRUCTURES, {
		// filter: object => object.hits < object.hitsMax
		filter: object => object.hits < 50
  });

	targets.sort((a,b) => a.hits - b.hits);

  if(targets.length > 0) {
		if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(targets[0]);
		}
  }
}

module.exports = taskRepair;