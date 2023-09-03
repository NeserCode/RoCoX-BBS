const userInfoTransformer = (data) => {
  if (data)
    return {
      id: data.id,
      username: data.username,
      name: data.name,
      avatar: data.avatar,
      email: data.email
    };
  else
    return null;
};

export { userInfoTransformer as u };
//# sourceMappingURL=user.mjs.map
