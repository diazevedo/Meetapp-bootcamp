import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        drescription: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        country: Sequelize.STRING,
        creator_id: Sequelize.INTEGER,
        image_id: Sequelize.INTEGER,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id', as: 'creator_id' });
    this.belongsTo(models.File, { foreignKey: 'id', as: 'image_id' });
  }
}

export default Meetup;
