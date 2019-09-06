import Meetup from '../models/Meetup';
import DateCheck from '../../helpers/DateValidator';
import MeetupSchemaValidator from '../../helpers/MeetupSchemaValidator';

class MeetupController {
  async store(req, res) {
    if (!MeetupSchemaValidator.store(req.body))
      return res.status(401).json({ error: 'Invalid data.' });

    if (DateCheck.isDateBeforeISO(req.body.date))
      return res.status(400).json({ error: 'Invalid date.' });

    const meetupCreated = await Meetup.create({
      ...req.body,
      creator_id: req.userId,
    });

    return res.json(meetupCreated);
  }

  async update(req, res) {
    return res.json({ ok: true });
  }
}

export default new MeetupController();