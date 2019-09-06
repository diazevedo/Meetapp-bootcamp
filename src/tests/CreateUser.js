const createUser = async (app, name, email, password) => {
  const response = await app.post('/users').send({
    name,
    email,
    password,
  });

  return response.body;
};

export default createUser;
