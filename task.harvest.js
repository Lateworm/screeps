const settings = require('settings');

const taskHarvest = (creep) => {

	const sources = creep.room.find(FIND_SOURCES, {
		filter: sources => sources.energy > 0
	}).sort();
	
	const modIndex = creep.name.slice(-1)%2
	if (modIndex > sources.length-1) {
		modIndex = 0
	}

	if(creep.harvest(sources[modIndex]) == ERR_NOT_IN_RANGE) {
		if (settings.showHarvestPath) {
			creep.moveTo(sources[modIndex], {visualizePathStyle: {stroke: settings.harvestPathColour}});
		} else {
			creep.moveTo(sources[modIndex]);
		}
	}
};

module.exports = taskHarvest;