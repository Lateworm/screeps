const settings = require('settings');

const roleWorkDelegate = require('role.work.delegate');
const roleHarvester = require('role.work.task.harvest');
const roleUpgrader = require('role.work.task.upgrade');
const roleBuilder = require('role.work.task.build');

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
    
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    const roleCall = () => {
        console.log(harvesters.length + ' harvesters, '
            + upgraders.length + ' upgraders, '
            + builders.length + ' builders')
    }

    if(Game.time % 20 === 0) {
        roleCall();
    }

    // Calculate the cost of spawning a creep
    const newCreepCost = bodyParts => {
        return _.reduce(bodyParts, (cost, bodyPart) => cost + BODYPART_COST[bodyPart], 0);
    }
    
    // Auto-spawn harvesters
    let newHarvesterBodyParts = [WORK, CARRY, MOVE]
    let newHarvesterCost = newCreepCost(newHarvesterBodyParts)
    if(harvesters.length < settings.harvesterSpawnTarget && Game.spawns.Spawn1.energy >= newHarvesterCost) {
        const newHarvesterName = 'Harvester' + Game.time;
        console.log('Spending ' + newHarvesterCost + ' energy to spawn ' + newHarvesterName);
        console.log('#worthit!')
        Game.spawns['Spawn1'].spawnCreep(newHarvesterBodyParts, newHarvesterName, {memory: {role: 'harvester'}});
    }
    
    // Auto-spawn upgraders AFTER spawning harvesters
    let newUpgraderBodyParts = [WORK, CARRY, MOVE]
    let newUpgraderCost = newCreepCost(newUpgraderBodyParts)
    if(harvesters.length >= settings.harvesterSpawnTarget
        && upgraders.length < settings.upgraderSpawnTarget
        && Game.spawns.Spawn1.energy >= newUpgraderCost) {
        const newUpgraderName = 'Upgrader' + Game.time;
        console.log('Spending ' + newUpgraderCost + ' energy to spawn ' + newUpgraderName);
        Game.spawns['Spawn1'].spawnCreep(newUpgraderBodyParts, newUpgraderName,
            {memory: {role: 'upgrader'}});
    }

    // Auto-spawn builders AFTER spawning harveys and upgraders
    let newBuilderBodyParts = [WORK, CARRY, MOVE]
    let newBuilderCost = newCreepCost(newBuilderBodyParts)
    if(harvesters.length >= settings.harvesterSpawnTarget
        && upgraders.length >= settings.upgraderSpawnTarget
        && builders.length < settings.builderSpawnTarget
        && Game.spawns.Spawn1.energy >= newBuilderCost) {
        const newBuilderName = 'Builder' + Game.time;
        console.log('Spending ' + newBuilderCost + ' energy to spawn ' + newBuilderName);
        Game.spawns['Spawn1'].spawnCreep(newBuilderBodyParts, newBuilderName,
            {memory: {role: 'builder'}});
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




