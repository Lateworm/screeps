const settings = {

  // Spawning
  workerBodyParts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
  workerSpawnTarget: 10,
  repairerSpawnTarget: 1,

  // Tasks
  harvest: true,
  build: true,
  upgrade: true,
  store: true,

  // Structural repairs
  repair: true,
  wallRepairTarget: 7 * 1000,
  containerRepairTarget: 80 * 1000,
  
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
  SitRepOnTick: 15,

}

module.exports = settings;