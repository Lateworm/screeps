const settings = require('settings');

const taskBuild = (creep) => {

	if(creep.memory.building && creep.carry.energy == 0) {
		creep.memory.building = false;
		creep.say('💲 harvest');
	}

	if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
		creep.memory.building = true;
		creep.say('🚧 build');
	}

	let targets = creep.room.find(FIND_CONSTRUCTION_SITES).sort();

	if(creep.memory.building && targets.length) {
	    
		if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
			if (settings.showBuildPath) {
				creep.moveTo(targets[0], {visualizePathStyle: {stroke: settings.buildPathColour}});
			} else {
				creep.moveTo(targets[0]);
			}
		}

	}

};

module.exports = taskBuild;