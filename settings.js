const settings = {

  // Spawning
  workerBodyParts: [WORK, CARRY, MOVE],
  workerSpawnTarget: 10,

  // Worker tasks
  build: true,
  upgrade: true,
  deposit: false,
  harvest: true,
  
  // Path visualization
  showBuildPath: true,
  buildPathColour: '#ff8800',
  showDepositPath: true,
  depositPathColour: '#00ff00',
  showHarvestPath: false,
  harvestPathColour: '#ffff00',
  showUpgradePath: false,
  upgradePathColour: '#0088ff',


  // Console
  roleCallOnTick: 30,

}

module.exports = settings;