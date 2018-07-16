const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

module.exports.loop = function () {
    
    // Take creep behaviour from role scripts based on a role set in their memory
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }

    // Calculate the cost of spawning a creep
    const creepCost = bodyParts => {
        return _.reduce(bodyParts, (cost, bodyPart) => cost + BODYPART_COST[bodyPart], 0);
    }
    
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    const harvesterSpawnTarget = 2
    const upgraderSpawnTarget = 50

    const roleCall = () => {
        let harvesterCount = harvesters.length
        let upgraderCount = upgraders.length
        console.log(harvesterCount + ' harvesters, ' + upgraderCount + ' upgraders.')
    }

    if(Game.time % 10 === 0) {
        roleCall();
    }
    
    // Auto-spawn harvesters
    // This creates a bunch of console spam at game start
    // Add a check for affordability?
    if(harvesters.length < harvesterSpawnTarget && Game.spawns.Spawn1.energy >= 200) {
        const newName = 'Harvester' + Game.time;
        console.log('Spawning ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    
    // Auto-spawn upgraders AFTER spawning harvesters
    if(harvesters.length >= harvesterSpawnTarget && upgraders.length < upgraderSpawnTarget && Game.spawns.Spawn1.energy >= 200) {
        const newName = 'Upgrader' + Game.time;
        console.log('Spawning ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
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




