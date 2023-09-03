import { a as defineEventHandler, r as readBody, s as sendError, c as createError, g as getUserByUsername, b as generateTokens, e as sendRefreshToken } from './nitro/node-server.mjs';
import bcrypt from 'bcrypt';
import { c as createRefreshToken } from './refreshTokens.mjs';
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
import 'jsonwebtoken';

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;
  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invaild pramas."
      })
    );
  }
  const user = await getUserByUsername(username);
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invaild user."
      })
    );
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invaild username or password."
      })
    );
  }
  const { accessToken, refreshToken } = generateTokens(user);
  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  });
  sendRefreshToken(event, refreshToken);
  return {
    user: userInfoTransformer(user),
    accessToken
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
