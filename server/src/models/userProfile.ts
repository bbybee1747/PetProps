import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import { User } from "./User.js";

interface UserProfileAttributes {
  id: number;
  userId: number;
  bio?: string;
  phoneNumber?: string;
  address?: string;
  photoUrl?: string;
}

interface UserProfileCreationAttributes extends Optional<UserProfileAttributes, "id"> {}

export class UserProfile extends Model<UserProfileAttributes, UserProfileCreationAttributes> implements UserProfileAttributes {
  public id!: number;
  public userId!: number;
  public bio?: string;
  public phoneNumber?: string;
  public address?: string;
  public photoUrl?: string;
}

export const UserProfileFactory = (sequelize: Sequelize) => {
  UserProfile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: User,
          key: "id",
        },
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "/default-profile.png",
      },
    },
    {
      sequelize,
      tableName: "user_profiles",
    }
  );

  return UserProfile;
};
