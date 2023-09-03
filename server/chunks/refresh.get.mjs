import { a as defineEventHandler, f as getCookie, s as sendError, c as createError, h as decodeRefreshToken, i as getUserById, b as generateTokens } from './nitro/node-server.mjs';
import { g as getRefreshTokenByToken } from './refreshTokens.mjs';
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

const refreshTokenTransformer = (data) => {
  return data.token;
};

const refresh_get = defineEventHandler(async (event) => {
  const cookie = getCookie(event, "refresh_token");
  if (!cookie)
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "ToKen invaild."
      })
    );
  const token = await getRefreshTokenByToken(cookie);
  if (!token)
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "ToKen invaild."
      })
    );
  const tokenPayload = decodeRefreshToken(refreshTokenTransformer(token));
  try {
    const user = await getUserById(tokenPayload.userId);
    if (!user)
      return sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: "Something went wrong."
        })
      );
    const { accessToken } = generateTokens(user);
    return { accessToken };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Something went wrong."
      })
    );
  }
});

export { refresh_get as default };
//# sourceMappingURL=refresh.get.mjs.map
