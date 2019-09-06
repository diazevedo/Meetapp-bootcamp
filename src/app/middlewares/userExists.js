import User from '../models/User';

const userExists = async (req, res, next) => {
  const userFound = await User.findByPk(req.userId);
  if (!userFound) return res.statusCode(401).json({ error: 'User not found.' });

  return next();
};

export default userExists;
