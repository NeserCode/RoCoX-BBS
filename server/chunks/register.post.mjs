import { a as defineEventHandler, r as readBody, s as sendError, c as createError, j as createUser } from './nitro/node-server.mjs';
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

const register_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password, passwordRepeat, email, name } = body;
  if (!username || !password || !email || !name) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invaild pramas: something null."
      })
    );
  }
  if (password !== passwordRepeat) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Password do not match."
      })
    );
  }
  const registerData = {
    username,
    password,
    email,
    name,
    avatar: "https://picsum.photos/300/300"
  };
  const user = await createUser(registerData);
  return userInfoTransformer(user);
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
