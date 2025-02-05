import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./User";

export class UserSavedPets extends Model {
  public id!: number;
  public user_id!: number;
  public pet_id!: number;
  public created_at!: Date;
}

export function UserSavedPetsFactory(sequelize: Sequelize) {
  UserSavedPets.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      pet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "user_saved_pets",
      sequelize,
      timestamps: false,
    }
  );

  return UserSavedPets;
}
