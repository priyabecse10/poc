module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin","user"),
      //allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
  });

  users.associate=(models)=>{
    users.hasMany(models.books,{
      foreignKey:'user_id',
      as:'Books',
    });
  };
  return users;
};
