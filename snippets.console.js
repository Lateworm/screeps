// Spawn a harvester
Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], "UniqueName", {role: 'harvester'});
// But what's the difference between createCreep and spawnCreep??

// Console.log the number of harvesters we have
var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
console.log('Harvesters: ' + harvesters.length);
