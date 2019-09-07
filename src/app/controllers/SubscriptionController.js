import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import Notification from '../schemas/Notification';
import Mail from '../../lib/Mail';

class SubscriptionController {
  async store(req, res) {
    const { meetup_id = 0 } = req.params;
    const user_id = req.userId;
    const meetup = await Meetup.findByPk(meetup_id, {
      include: {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    });

    if (!meetup)
      return res.status(401).json({ error: 'Meetup was not found.' });

    if (meetup.past) {
      return res
        .status(401)
        .json({ error: 'Sorry, this meetup has occurred already.' });
    }

    if (meetup.user_id === user_id) {
      return res.status(401).json({
        error: 'Sorry, you are the organiser of this meetup, do not need sub.',
      });
    }

    const userMeetup = await Subscription.findAll({
      where: { user_id, meetup_id },
    });

    if (userMeetup.length > 0) {
      return res.status(401).json({
        error: 'Sorry, you are already subscripted in this meetup.',
      });
    }

    const meetupAtSameHour = await Subscription.findOne({
      where: { user_id },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (meetupAtSameHour) {
      return res.status(401).json({
        error:
          'Sorry, You are enrolled in another meetup for the same date and hour.',
      });
    }

    const subscription = await Subscription.create({ meetup_id, user_id });
    const userGuest = await User.findByPk(user_id);

    await Notification.create({
      content: `Hi, ${meetup.User.name},  ${userGuest.name} is going to your meetup ${meetup.title}`,
      user: meetup.User.id,
    });

    await Mail.sendMail({
      to: meetup.User.email,
      subject: `New guest to your Meetup ${meetup.title}`,
      template: 'subscription',
      context: {
        organiser: meetup.User.name,
        guest: userGuest.name,
        meetup: meetup.title,
      },
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
