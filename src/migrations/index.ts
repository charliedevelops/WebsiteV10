import * as migration_20250125_180025 from './20250125_180025';
import * as migration_20260218_221434 from './20260218_221434';
import * as migration_20260218_222558 from './20260218_222558';
import * as migration_20260218_223544 from './20260218_223544';

export const migrations = [
  {
    up: migration_20250125_180025.up,
    down: migration_20250125_180025.down,
    name: '20250125_180025',
  },
  {
    up: migration_20260218_221434.up,
    down: migration_20260218_221434.down,
    name: '20260218_221434',
  },
  {
    up: migration_20260218_222558.up,
    down: migration_20260218_222558.down,
    name: '20260218_222558',
  },
  {
    up: migration_20260218_223544.up,
    down: migration_20260218_223544.down,
    name: '20260218_223544'
  },
];
