import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize'; // Use your central Sequelize instance
import { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password_hash!: string;
  public created_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Use the central Sequelize instance
    modelName: 'User',
    tableName: 'user', // Map to the correct table name
    timestamps: false, // Disable default `createdAt` and `updatedAt`
  }
);

// Update user request body interface
export interface UpdateUser {
  username: string;
  email: string;
}

// Response format for user-related requests
export interface UserResponse {
  id: number;
  username: string;
  email: string;
  created_at: Date;
}

// JWT Payload interface for authentication
export interface CustomJwtPayload extends DefaultJwtPayload {
  id: number;
  email: string;
  username: string;
}

export default User;
