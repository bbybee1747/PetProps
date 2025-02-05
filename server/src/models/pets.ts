import { DataTypes, Model, Sequelize } from "sequelize";

export class Pet extends Model {
  public id!: number;
  public name!: string;
  public age!: string;
  public gender!: string;
  public species!: string;
  public breed_primary!: string;
  public breed_secondary!: string | null;
  public breed_mixed!: boolean;
  public photos!: object[];
  public description!: string;
  public status!: string;
}

export function PetFactory(sequelize: Sequelize) {
  Pet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      breed_primary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      breed_secondary: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      breed_mixed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      photos: {
        type: DataTypes.JSONB, 
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "pets",
      sequelize,
    }
  );

  return Pet;
}
