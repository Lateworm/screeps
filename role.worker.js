const taskBuild = require('task.build');
const taskDeposit = require('task.deposit');
const taskHarvest = require('task.harvest');
const taskUpgrade = require('task.upgrade');


const roleWorker = {

  run: function(creep) {
		taskUpgrade(creep)

		if(!creep.memory.upgrading && creep.carry.energy < creep.carryCapacity) {
			taskHarvest(creep)
			console.log('if _ harvest');
		} else {
			taskDeposit(creep)
			// TODO: if can't deposit (there's nothing to do) log an inactivity warning
			console.log('else deposit');
		}
	}
    
};

module.exports = roleWorker;