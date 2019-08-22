import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (userExists)
      return res
        .status(401)
        .json({ error: 'Sorry, this email has been registered already.' });

    const user = await User.create(req.body);

    return res.json({ ok: 'ok', user });
  }
}

export default new UserController();
