import { a as defineEventHandler } from './nitro/node-server.mjs';
import { u as userInfoTransformer } from './user.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'url-pattern';
import '@prisma/client';
import 'bcrypt';
import 'jsonwebtoken';

const user_get = defineEventHandler((event) => {
  var _a;
  return {
    user: userInfoTransformer((_a = event.context.auth) == null ? void 0 : _a.user)
  };
});

export { user_get as default };
//# sourceMappingURL=user.get.mjs.map
