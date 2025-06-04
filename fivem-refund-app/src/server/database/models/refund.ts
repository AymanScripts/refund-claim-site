import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

class Refund extends Model {}

Refund.init({
  player_identifier: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  refund_data: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  is_claimed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Refund',
  tableName: 'refunds',
  timestamps: false,
});

export default Refund;