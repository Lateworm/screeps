const settings = require('settings');

const taskBuild = require('task.build');
const taskDeposit = require('task.deposit');
const taskHarvest = require('task.harvest');

const taskRepair = require('task_repair');
const vetRepair = require('vet_repair');

const taskStore = require('task.store');

const taskUpgrade = require('task_upgrade');
const vetUpgrade = require('vet_upgrade');

const roleWorker = {
  run: function(creep) {

		// if out of energy, harvest
		if (creep.carry.energy === 0) {
			creep.memory.task = 'harvest';
			if(settings.say){creep.say('harvest')};
		}

		// Choose a task, bottommost is highest priority
		vetUpgrade(creep)
		vetRepair(creep)

		switch (creep.memory.task) {
			case 'upgrade':
				taskUpgrade(creep)
				break;
			case 'repair':
				taskRepair(creep)
				break;
			default:
				console.log('reached end of task switch')
		}

		if (settings.store) {
			taskStore(creep)
		}

		if (settings.build) {
			taskBuild(creep)
		}

		// if not able to work, then harvest or deposit
		if (settings.harvest &&
				creep.memory.task !== 'upgrade' &&
				creep.memory.task !== 'build' &&
				creep.memory.task !== 'repair' &&
				creep.carry.energy < creep.carryCapacity) {
			taskHarvest(creep)
		} else {
			taskDeposit(creep)
			// TODO: if can't deposit (there's nothing to do) log an inactivity warning
		}

		// TODO: repairers shouldn't prioritize depositing

	} 
};

module.exports = roleWorker;