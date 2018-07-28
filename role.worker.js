const settings = require('settings');

const taskBuild = require('task.build');
const taskDeposit = require('task.deposit');
const taskHarvest = require('task.harvest');
const taskRepair = require('task.repair');
const taskUpgrade = require('task.upgrade');

const roleWorker = {

  run: function(creep) {

		// if out of energy, harvest
		if (creep.carry.energy === 0) {
			creep.memory.task = 'harvest';
			creep.say('harvest');
		}



		if (settings.upgrade) {
			taskUpgrade(creep)
		}

		if (settings.repair) {
			taskRepair(creep)
		}

		if (settings.build) {
			taskBuild(creep)
		}

		// if not able to work, then harvest or deposit
		if (settings.harvest &&
				creep.memory.task !== 'upgrade' &&
				creep.memory.task !== 'build' &&
				creep.carry.energy < creep.carryCapacity) {
			taskHarvest(creep)
		} else {
			taskDeposit(creep)
			// TODO: if can't deposit (there's nothing to do) log an inactivity warning
		}
	}
    
};

module.exports = roleWorker;