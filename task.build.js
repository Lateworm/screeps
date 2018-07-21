const taskBuild = (creep) => {

	if(creep.memory.building && creep.carry.energy == 0) {
		creep.memory.building = false;
		creep.say('💲 harvest');
	}
	if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
		creep.memory.building = true;
		creep.say('🚧 build');
	}

	if(creep.memory.building) {
		let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if(targets.length) {
			if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
			}
		}
	}

	// else harvest was at the end...
	// so order of ifs in worker role needs to be reversed
};

module.exports = taskBuild;