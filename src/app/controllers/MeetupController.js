import { startOfHour, isBefore, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
  async store(req, res) {
    const userValid = await User.findByPk(req.userId);
    if (!userValid) {
      return res.status(400).json({ error: 'User invalid date' });
    }

    const hourStart = startOfHour(parseISO(req.body.date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const meetupCreated = await Meetup.create({
      ...req.body,
      creator_id: req.userId,
    });

    return res.json(meetupCreated);
  }
}

export default new MeetupController();
