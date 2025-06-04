import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

class Refund extends Model {
  public id!: number;
  public playerIdentifier!: string;
  public amount!: number;
  public reason!: string;
  public status!: 'pending' | 'claimed' | 'rejected';
  public createdAt!: Date;
  public updatedAt!: Date;
}

Refund.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    playerIdentifier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'claimed', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'refunds',
    timestamps: true,
  }
);

export default Refund;