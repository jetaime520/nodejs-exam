import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "./sequelize";

export class AppointmentService extends Model<
  InferAttributes<AppointmentService>,
  InferCreationAttributes<AppointmentService>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string | null;
  declare price: number;
  declare showTime: number;
  declare order: number;
  declare isRemove: boolean;
  declare isPublic: boolean;
  declare ShopId: string | null;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

AppointmentService.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // DB 也有 gen_random_uuid，這裡給 ORM 方便測試
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.INTEGER, allowNull: false },
    showTime: { type: DataTypes.INTEGER, allowNull: false },
    order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isRemove: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    isPublic: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ShopId: { type: DataTypes.UUID, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    tableName: "AppointmentServices",
  }
);