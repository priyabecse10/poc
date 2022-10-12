module.exports=(sequelize,DataTypes)=>{
  const books=sequelize.define('books',{
    name:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    price:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    date_of_expiry:{
      type:DataTypes.DATE,
      allowNull:false,
    },
  });
  books.associate=(models)=>{
    books.belongsTo(models.users,{
      foreignKey:'user_id',
      onDelete:'CASCADE',
    });
  };
  return books;
}; 
