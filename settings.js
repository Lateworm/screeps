const settings = {

  // Spawning
  workerBodyParts: [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
  workerSpawnTarget: 8,

  // Worker tasks
  build: true,
  repair: true,
  upgrade: true,
  harvest: true,
  // deposit: true, currently not implemented

  workerTaskPriorities: ['build', 'repair', 'upgrade', 'harvest', 'deposit'],
  
  // Path visualization
  showBuildPath: true,
  buildPathColour: '#ff8800', // orange
  showDepositPath: true,
  depositPathColour: '#00ff00', // green
  showHarvestPath: true,
  harvestPathColour: '#ffff00', // yeller
  showRepairPath: true,
  repairPathColour: '#ff00ff', // magenta
  showUpgradePath: true,
  upgradePathColour: '#0088ff', // cyan/blue

  // Console
  SitRepOnTick: 10,

}

module.exports = settings;