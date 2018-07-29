const settings = require('settings');
const roleWorker = require('role.work');
const roleRepair = require('role.repair');

module.exports.loop = function () {
  
  // Take creep behaviour from role scripts based on a role set in their memory
  for(let name in Game.creeps) {
    let creep = Game.creeps[name];
    if(creep.memory.role == 'worker') {
      roleWorker.run(creep);
    }
    if(creep.memory.role == 'repair') {
      roleRepair.run(creep);
    }
  }
  
  const workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
  const repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair')

  // Find total available energy
  const roomEnergy = Game.spawns['Spawn1'].room.energyAvailable
  
  // SitRep
  if(Game.time % settings.SitRepOnTick === 0) {
    console.log(
      'Workers: ' + workers.length + '/' + settings.workerSpawnTarget +
      ', Repairers: ' + repairers.length + '/' + settings.repairerSpawnTarget
    )
    console.log('Energy:', + roomEnergy)
  }
  
  // Calculate the cost of spawning a creep
  const newCreepCost = bodyParts => {
    return _.reduce(bodyParts, (cost, bodyPart) => cost + BODYPART_COST[bodyPart], 0);
  }


  
  // Auto-spawn workers
  let newWorkerCost = newCreepCost(settings.workerBodyParts)
  if( workers.length < settings.workerSpawnTarget && roomEnergy >= newWorkerCost) {
    const newWorkerName = 'Worker' + Game.time;
    console.log('Spending ' + newWorkerCost + ' energy to spawn ' + newWorkerName);
    Game.spawns['Spawn1'].spawnCreep(settings.workerBodyParts, newWorkerName, {memory: {role: 'worker'}});
  }

  let newRepairerCost = newCreepCost(settings.workerBodyParts)
  if( repairers.length < settings.repairerSpawnTarget && roomEnergy >= newRepairerCost) {
    const newRepairerName = 'Repairer' + Game.time;
    console.log('Spending ' + newRepairerCost + ' energy to spawn ' + newRepairerName);
    Game.spawns['Spawn1'].spawnCreep(settings.workerBodyParts, newRepairerName, {memory: {role: 'repair'}});
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
      }
    }
  }
  
  
  
  
  