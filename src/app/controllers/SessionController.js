import User from '../models/User';

class SessionControler {
  async storeToken(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: 'User not found.' });

    if (!user.passwordCheck(password))
      return res.status(401).json({ error: 'Invalid Password.' });

    return res.json(user);
  }

  checkToken() {}
}

export default new SessionControler();
