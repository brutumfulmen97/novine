import * as migration_20250417_111816 from './20250417_111816';
import * as migration_20250417_213114_event from './20250417_213114_event';

export const migrations = [
  {
    up: migration_20250417_111816.up,
    down: migration_20250417_111816.down,
    name: '20250417_111816',
  },
  {
    up: migration_20250417_213114_event.up,
    down: migration_20250417_213114_event.down,
    name: '20250417_213114_event'
  },
];
