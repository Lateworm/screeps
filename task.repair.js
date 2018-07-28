const settings = require('settings');

const taskRepair = (creep) => {

	if(creep.memory.task !== 'repair' && creep.carry.energy == creep.carryCapacity) {
		creep.memory.task = 'repair';
		creep.say('repair');
	}

  const targets = creep.room.find(FIND_STRUCTURES, {
		// filter: object => object.hits < object.hitsMax
		filter: object => object.hits < 3000 && object.hits !== 0
  }).sort(); // TODO: sort by hit points so we can always repair the weakest link

	targets.sort((a,b) => a.hits - b.hits);

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