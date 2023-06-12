const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Favorite = sequelize.define(
    "Favorite",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      altura: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      peso: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      anios_vida: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      temperamento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Favorite;
};
