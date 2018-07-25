const settings = require('settings');
const roleWorker = require('role.worker');

module.exports.loop = function () {
    
    // Take creep behaviour from role scripts based on a role set in their memory
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
        // if(creep.memory.role == 'harvester') {
        //     roleHarvester.run(creep);
        // }
    }
    
    const workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');

    const roleCall = () => {
      console.log('Current worker count: ' + workers.length + ', target: ' + settings.workerSpawnTarget)
    }

    
    if(Game.time % settings.roleCallOnTick === 0) {
      roleCall();
    }

    // Calculate the cost of spawning a creep
    const newCreepCost = bodyParts => {
      return _.reduce(bodyParts, (cost, bodyPart) => cost + BODYPART_COST[bodyPart], 0);
    }

    // Auto-spawn workers
    let newWorkerCost = newCreepCost(settings.workerBodyParts)
    if( workers.length < settings.workerSpawnTarget && Game.spawns.Spawn1.energy >= newWorkerCost) {
			const newWorkerName = 'Worker' + Game.time;
			console.log('Spending ' + newWorkerCost + ' energy to spawn ' + newWorkerName);
			Game.spawns['Spawn1'].spawnCreep(settings.workerBodyParts, newWorkerName, {memory: {role: 'worker'}});
		}

    // Print a spawning message when spawning
    if(Game.spawns['Spawn1'].spawning) {
        const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    // Clear memory from dead creeps
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
            roleCall();
        }
    }
}




