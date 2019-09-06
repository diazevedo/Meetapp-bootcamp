import Meetup from '../models/Meetup';
import DateCheck from '../../helpers/DateValidator';
import MeetupSchemaValidator from '../../helpers/MeetupSchemaValidator';

class MeetupController {
  async store(req, res) {
    if (!(await MeetupSchemaValidator.store(req.body)))
      return res.status(401).json({ error: 'Invalid data sent.' });

    if (await DateCheck.isDateBeforeISO(req.body.date))
      return res.status(400).json({ error: 'Invalid date.' });

    const meetupCreated = await Meetup.create({
      ...req.body,
      creator_id: req.userId,
    });

    return res.json({
      id: meetupCreated.id,
      title: meetupCreated.title,
      description: meetupCreated.description,
      location: meetupCreated.location,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const meetup = await Meetup.findByPk(id);

    if (!meetup)
      return res.status(401).json({ error: 'Meetup was not found.' });

    if (meetup.creator_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'You are not allowed to cancel this meetup.' });
    }

    if (meetup.past)
      return res.status(401).json({ error: 'You cannot modify past meetups.' });

    if (!(await MeetupSchemaValidator.update(req.body)))
      return res.status(401).json({ error: 'Invalid data sent.' });

    if (req.body.date && (await DateCheck.isDateBeforeISO(req.body.date))) {
      return res.status(401).json({ error: 'A past date cannot be set.' });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const { id } = req.params;
    const meetup = await Meetup.findByPk(id);
    if (!meetup)
      return res.status(400).json({ error: 'Meetup was not found.' });

    if (meetup.creator_id !== req.userId) {
      return res
        .status(403)
        .json({ error: 'You are not allowed to cancel this meetup.' });
    }

    if (meetup.past)
      return res
        .status(401)
        .json({ error: 'You cannot cancel this meetup once it has occured..' });

    await meetup.destroy();

    return res.json({ deleted: true });
  }
}

export default new MeetupController();
