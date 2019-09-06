import { Sequelize, Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        date: Sequelize.DATE,
        location: Sequelize.STRING,
        creator_id: Sequelize.INTEGER,
        file_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'creator_id' });
    this.belongsTo(models.File, { foreignKey: 'file_id' });
  }
}

export default Meetup;
