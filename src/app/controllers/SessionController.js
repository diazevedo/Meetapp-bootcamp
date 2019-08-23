import jwt from 'jsonwebtoken';
import User from '../models/User';
import SessionSchemaValidator from '../../helpers/SessionSchemaValidator';
import authConfig from '../../config/auth';

class SessionController {
  async storeToken(req, res) {
    const isDataValid = await SessionSchemaValidator.createSession(req.body);

    if (!isDataValid)
      return res.status(400).json({ error: 'Sorry, validation has failed' });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: 'User not found.' });

    if (!(await user.passwordCheck(password)))
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
