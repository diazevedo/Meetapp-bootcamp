import * as Yup from 'yup';

class UserSchemaValidator {
  async store(user) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    const isValid = await schema.isValid(user);
    return isValid;
  }

  update() {}
}

export default new UserSchemaValidator();
