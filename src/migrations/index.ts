import * as migration_20250125_180025 from './20250125_180025';

export const migrations = [
  {
    up: migration_20250125_180025.up,
    down: migration_20250125_180025.down,
    name: '20250125_180025'
  },
];
