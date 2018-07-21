const taskBuild = require('task.build');
const taskDeposit = require('task.deposit');
const taskHarvest = require('task.harvest');
const taskUpgrade = require('task.upgrade');


const roleWorker = {

  run: function(creep) {
		if(creep.carry.energy < creep.carryCapacity) {
			taskHarvest(creep)
		} else {
			taskDeposit(creep)
		}
	}
    
};

module.exports = roleWorker;