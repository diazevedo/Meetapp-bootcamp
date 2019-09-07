import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, userGuest } = data;
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
  }
}
export default new SubscriptionMail();
