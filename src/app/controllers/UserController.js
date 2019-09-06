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
    const isDataValid = await UserValidator.update(req.body);
    if (!isDataValid)
      return res.status(401).json({ error: 'Sorry, incomplete data.' });

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (user.email !== email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res
          .status(401)
          .json({ error: 'This email is already registered.' });
      }
    }

    if (oldPassword && !(await user.passwordCheck(oldPassword)))
      return res.status(401).json({ error: 'Invalid password.' });

    const { name } = await user.update(req.body);

    return res.json({ name, email });
  }
}

export default new UserController();
