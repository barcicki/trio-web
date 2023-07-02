/* eslint-env node */

import('./server/index.js')
  .then((m) => m.startServer('./dist', process.env.PORT || 8080));
