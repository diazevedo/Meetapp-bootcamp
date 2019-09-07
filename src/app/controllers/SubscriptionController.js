import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';

class SubscriptionController {
  async store(req, res) {
    const { meetup_id = 0 } = req.params;

    const meetup = await Meetup.findByPk(meetup_id);
    if (!meetup)
      return res.status(401).json({ error: 'Meetup was not found.' });

    return res.json({ ok: true });
  }
}

export default new SubscriptionController();
