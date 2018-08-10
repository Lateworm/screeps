const settings = require('settings');

const vetRepair = (creep) => {
	const targets = creep.room.find(FIND_STRUCTURES, {
		filter: object => (object.hits < object.hitsMax) || 
			(object.structureType === 'constructedWall' && object.hits < settings.wallRepairTarget) ||
			(object.structureType === 'container' && object.hits < settings.containerRepairTarget)
			// TODO: the wall/container logic doesn't work because the settings are < object.hitsMax
	}).sort((a,b) => a.hits - b.hits); // causes repairer to jump between targets constantly

  if(settings.repair
    && creep.carry.energy === creep.carryCapacity
    && targets.length
  ) {
		creep.memory.task = 'repair';
		if(settings.say){creep.say('repair')};
	}
};

module.exports = vetRepair;