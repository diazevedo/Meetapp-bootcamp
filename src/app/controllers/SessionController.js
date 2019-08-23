import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/jwt';

class SessionController {
  async storeToken(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: 'User not found.' });

    if (!user.passwordCheck(password))
      return res.status(401).json({ error: 'Invalid Password.' });

    const token = SessionController.createToken(user.id);
    const response = {
      user: {
        id: user.id,
        name: user.name,
        email,
      },
      token,
    };

    return res.json(response);
  }

  static createToken(id) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  }
}

export default new SessionController();
