const taskHarvest = (creep) => {

	const sources = creep.room.find(FIND_SOURCES);
	// const randomSourceIndex = Math.random(0, sources.length-1)
	if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
<<<<<<< HEAD
		// creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
		creep.moveTo(sources[0]);
=======
		creep.moveTo(sources[1]); // defualt was 0, but that one was farther away
		// TODO: move to closest source
>>>>>>> Tweak things after connecting to server
	}

};

module.exports = taskHarvest;