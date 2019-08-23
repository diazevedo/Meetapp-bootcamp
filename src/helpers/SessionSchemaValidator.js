import * as Yup from 'yup';

class SessionSchemaValidator {
  async createSession(req) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    const isValid = await schema.isValid(req);
    return isValid;
  }
}

export default new SessionSchemaValidator();
