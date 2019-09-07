const jwtConfig = {
  secret: process.env.APP_SECRET,
  expiresIn: '7d',
};

export default jwtConfig;
