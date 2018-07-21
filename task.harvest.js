const taskHarvest = (creep) => {

	const sources = creep.room.find(FIND_SOURCES);
	// const randomSourceIndex = Math.random(0, sources.length-1)
	if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
		creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
	}

};

module.exports = taskHarvest;