const settings = {

  // Spawning
  workerBodyParts: [WORK, CARRY, CARRY, MOVE, MOVE],
  workerSpawnTarget: 8,

  // Worker tasks
  build: true,
  // deposit: true, currently not implemented
  harvest: true,
  repair: false,
  upgrade: false,
  
  // Path visualization
  showBuildPath: true,
  buildPathColour: '#ff8800', // orange
  showDepositPath: true,
  depositPathColour: '#00ff00', // green
  showHarvestPath: true,
  harvestPathColour: '#ffff00', // yeller
  showUpgradePath: true,
  upgradePathColour: '#0088ff', // cyan/blue

  // Console
  SitRepOnTick: 10,

}

module.exports = settings;