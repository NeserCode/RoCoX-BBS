import { a as defineEventHandler, f as getCookie, e as sendRefreshToken } from './nitro/node-server.mjs';
import { r as removeRefreshToken } from './refreshTokens.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, "refresh_token");
    await removeRefreshToken(refreshToken);
  } catch (error) {
    console.log(error);
  }
  sendRefreshToken(event, null);
  return { message: "Done" };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
