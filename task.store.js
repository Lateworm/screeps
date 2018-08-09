const settings = require('settings');

const taskStore = (creep) => {
  const containers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_CONTAINER 
  }).sort();

  if(creep.memory.task !== 'store' &&
    creep.carry.energy === creep.carryCapacity &&
    containers[0].store.energy < containers[0].storeCapacity
    ) {
    creep.memory.task = 'store';
    if(settings.say){creep.say('store')};
  }

  if(creep.memory.task === 'store' && containers.length) {
    if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      if (settings.showStorePath) {
        creep.moveTo(containers[0], {visualizePathStyle: {stroke: settings.storePathColour}});
      } else {
        creep.moveTo(containers[0]);
      }
    }
  }
}

module.exports = taskStore



