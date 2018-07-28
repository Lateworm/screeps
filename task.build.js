const settings = require('settings');

const taskBuild = (creep) => {

	if(creep.memory.task !== 'build' && creep.carry.energy === creep.carryCapacity) {
		creep.memory.task = 'build';
		creep.say('build');
	}

	const targets = creep.room.find(FIND_CONSTRUCTION_SITES).sort();

	if(creep.memory.task === 'build' && targets.length) {
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