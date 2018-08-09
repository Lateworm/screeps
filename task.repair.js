const settings = require('settings');

const taskRepair = (creep) => {
	const targets = creep.room.find(FIND_STRUCTURES, {
		filter: object => (object.hits < object.hitsMax) || 
			(object.structureType === 'constructedWall' && object.hits < settings.wallRepairTarget) ||
			(object.structureType === 'container' && object.hits < settings.containerRepairTarget)
			// TODO: the wall/container logic doesn't work because the settings are < object.hitsMax
	}).sort((a,b) => a.hits - b.hits); // causes repairer to jump between targets constantly

	if(creep.memory.task !== 'repair' && creep.carry.energy === creep.carryCapacity && targets.length) {
		creep.memory.task = 'repair';
		if(settings.say){creep.say('repair')};
	}

  if(creep.memory.task === 'repair' && targets.length) {
		if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
			if (settings.showRepairPath) {
				creep.moveTo(targets[0], {visualizePathStyle: {stroke: settings.repairPathColour}});
			} else {
				creep.moveTo(targets[0]);
			}
		}
	}
}

module.exports = taskRepair;