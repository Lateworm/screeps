const settings = require('settings');

const taskHarvest = (creep) => {

	const sources = creep.room.find(FIND_SOURCES).sort();
	const modIndex = creep.name.slice(-1)%2
	if (modIndex > sources.length-1) {
		modIndex = 0
	}

	// console.log(JSON.stringify(creep));
	// const randomSourceIndex = Math.random(0, sources.length-1)

	if(creep.harvest(sources[modIndex]) == ERR_NOT_IN_RANGE) {
	    if (settings.showHarvestPath) {
		    creep.moveTo(sources[modIndex], {visualizePathStyle: {stroke: settings.harvestPathColour}});
	    } else {
	        creep.moveTo(sources[modIndex]);
	    }
	}

};

module.exports = taskHarvest;