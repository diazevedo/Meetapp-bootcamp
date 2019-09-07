import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';

class MeetupCreatorController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'description', 'date', 'location'],
      order: ['date'],
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(meetups);
  }
}

export default new MeetupCreatorController();
