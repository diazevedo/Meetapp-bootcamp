import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email, name } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (userExists)
      return res
        .status(401)
        .json({ error: 'Sorry, this email has been registered already.' });

    const { id } = await User.create(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
