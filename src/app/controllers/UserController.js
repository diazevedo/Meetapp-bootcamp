import User from '../models/User';
import UserValidator from '../../helpers/UserSchemaValidator';

class UserController {
  async store(req, res) {
    const isDataValid = await UserValidator.store(req.body);

    if (!isDataValid)
      return res.status(401).json({ error: 'Sorry, incomplete data.' });

    const { email, name } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (userExists)
      return res
        .status(401)
        .json({ error: 'Sorry, this email has been registered already.' });

    const { id } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const { name, email, password } = req.body;
    res.json({ name, email, password });
  }
}

export default new UserController();
