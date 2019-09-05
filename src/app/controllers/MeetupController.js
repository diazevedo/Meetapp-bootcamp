import Meetup from '../models/Meetup';

class MeetupController {
  store(req, res) {
    Meetup.create();
    res.json({ ok: true });
  }
}

export default new MeetupController();
