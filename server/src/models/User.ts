import { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
import { Sequelize, DataTypes } from 'sequelize';
import { Model, Optional } from 'sequelize';

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

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
    sequelize,
    modelName: 'User',
  }
);

export interface UpdateUser {
    username: string;
    email: string;
}

export interface UserResponse {
    id: number;
    username: string;
    email: string;
    created_at: Date;
}

export interface CustomJwtPayload extends DefaultJwtPayload {
    id: number;
    email: string;
    username: string;
}

export default User;