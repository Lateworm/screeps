const taskBuild = require('task.build');
const taskDeposit = require('task.deposit');
const taskHarvest = require('task.harvest');
const taskUpgrade = require('task.upgrade');


const roleWorker = {

  run: function(creep) {
		taskUpgrade(creep)
		taskBuild(creep)

		// if not upgrading and out of energy, harvest
		if (!creep.memory.upgrading &&
				!creep.memory.building &&
				creep.carry.energy < creep.carryCapacity) {
			taskHarvest(creep)
		} else {
			taskDeposit(creep)
			// TODO: if can't deposit (there's nothing to do) log an inactivity warning
		}
	}
    
};

module.exports = roleWorker;