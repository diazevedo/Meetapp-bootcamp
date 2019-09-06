import { Sequelize, Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        event_date: Sequelize.DATE,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        country: Sequelize.STRING,
        creator_id: Sequelize.INTEGER,
        image_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id', as: 'id_creator' });
    this.belongsTo(models.File, { foreignKey: 'id', as: 'id_image' });
  }
}

export default Meetup;
