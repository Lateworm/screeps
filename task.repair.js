const settings = require('settings');

const taskRepair = (creep) => {
	const targets = creep.room.find(FIND_STRUCTURES, {
		filter: object => object.hits < object.hitsMax || 
			(object.structureType === 'constructedWall' && object.hits < settings.wallRepairTarget) ||
			(object.structureType === 'container' && object.hits < settings.containerRepairTarget)
		// filter: object => object.hits < 3000 && object.hits !== 0
	}).sort((a,b) => a.hits - b.hits);

	if(Game.time % settings.SitRepOnTick === 0) {
		console.log('Structures to repair: ' + targets.length)
	}

	if(creep.memory.task !== 'repair' && creep.carry.energy === creep.carryCapacity) {
		creep.memory.task = 'repair';
		creep.say('repair');
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