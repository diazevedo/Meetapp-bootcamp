const auth = async (app, email, password) => {
  const authentication = await app.post('/session').send({ email, password });

  return `bearer ${authentication.body.token}`;
};

export default auth;
