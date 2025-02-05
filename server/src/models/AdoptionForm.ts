import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface AdoptionFormAttributes {
  id: number;
  user_id: number;
  pet_id: number;
  pet_name: string;
  pet_type: string;
  pet_breed: string;
  pet_age: number;
  reason: string;
  status: string;
  submitted_at: Date;
}

export interface AdoptionFormCreationAttributes extends Optional<AdoptionFormAttributes, "id"> {}

export class AdoptionForm extends Model<AdoptionFormAttributes, AdoptionFormCreationAttributes>
  implements AdoptionFormAttributes {
  public id!: number;
  public user_id!: number;
  public pet_id!: number;
  public pet_name!: string;
  public pet_type!: string;
  public pet_breed!: string;
  public pet_age!: number;
  public reason!: string;
  public status!: string;
  public submitted_at!: Date;
}

export function AdoptionFormFactory(sequelize: Sequelize): typeof AdoptionForm {
  AdoptionForm.init(
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
        references: {
          model: "pets",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      pet_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pet_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pet_breed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pet_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending",
      },
      submitted_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "adoption_forms",
      sequelize,
      timestamps: true, 
    }
  );

  return AdoptionForm;
}
