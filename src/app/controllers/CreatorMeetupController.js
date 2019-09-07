import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';

class MeetupCreatorController {
  async index(req, res) {
    const user_id = req.userId;
    const meetups = await Meetup.findAll({
      where: {
        user_id,
      },
      attributes: ['id', 'description', 'date', 'location'],
      order: ['date'],
      include: [
        {
          model: File,
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(meetups);
  }
}

export default new MeetupCreatorController();
