import * as migration_20250417_111816 from './20250417_111816';

export const migrations = [
  {
    up: migration_20250417_111816.up,
    down: migration_20250417_111816.down,
    name: '20250417_111816'
  },
];
