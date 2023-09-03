import { p as prisma } from './nitro/node-server.mjs';

const createRefreshToken = (data) => {
  return prisma.refreshToken.create({
    data
  });
};
const getRefreshTokenByToken = (token) => {
  return prisma.refreshToken.findUnique({
    where: {
      token
    }
  });
};
const removeRefreshToken = (token) => {
  return prisma.refreshToken.delete({
    where: {
      token
    }
  });
};

export { createRefreshToken as c, getRefreshTokenByToken as g, removeRefreshToken as r };
//# sourceMappingURL=refreshTokens.mjs.map
