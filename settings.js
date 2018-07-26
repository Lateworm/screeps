const settings = {

  // Spawning
  workerBodyParts: [WORK, CARRY, MOVE],
  workerSpawnTarget: 16,

  // Worker tasks
  build: true,
  upgrade: true,
  harvest: true,
  
  // Path visualization
  showBuildPath: true,
  buildPathColour: '#ff8800',
  showDepositPath: true,
  depositPathColour: '#00ff00',
  showHarvestPath: true,
  harvestPathColour: '#ffff00',
  showUpgradePath: true,
  upgradePathColour: '#0088ff',


  // Console
  roleCallOnTick: 30,

}

module.exports = settings;