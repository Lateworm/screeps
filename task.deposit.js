const settings = require('settings');

const taskDeposit = (creep) => {

  var targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
        structure.energy < structure.energyCapacity;
    }
  });

  if(targets.length > 0) {
    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      if (settings.showDepositPath) {
        creep.moveTo(targets[0], {visualizePathStyle: {stroke: settings.depositPathColour}});
      } else {
        creep.moveTo(targets[0]);
      }
    }
  }

};

module.exports = taskDeposit