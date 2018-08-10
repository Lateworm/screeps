const settings = {

  // Spawning
  workerBodyParts: [WORK, CARRY, MOVE],
  workerSpawnTarget: 12,

  // Work Role
  harvest: true,
  build: true,
  upgrade: true,
  store: false,
  // WorkPriorities: ['build', 'repair', 'upgrade', 'deposit', 'store', 'harvest'],

  // Structural repairs
  repair: false,
  wallRepairTarget: 10 * 1000,
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
  showStorePath: true,
  storePathColour: '009900', // green
  showUpgradePath: true,
  upgradePathColour: '#0088ff', // cyan/blue

  // Speech bubbles
  say: false,

  // Console
  SitRepOnTick: 5,

}

module.exports = settings;