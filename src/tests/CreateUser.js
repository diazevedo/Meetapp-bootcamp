const createUser = async (app, name, email, password) => {
  const user = await app.post('/users').send({
    name,
    email,
    password,
  });

  return user;
};

export default createUser;
