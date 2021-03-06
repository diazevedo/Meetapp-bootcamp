import * as Yup from 'yup';

class MeetupValidator {
  async store(meetup) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    const isValid = await schema.isValid(meetup);
    return isValid;
  }

  async update(meetup) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      file_id: Yup.number(),
    });

    const isValid = await schema.isValid(meetup);
    return isValid;
  }
}

export default new MeetupValidator();
