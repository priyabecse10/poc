module.exports = {
  up:(queryInterface, Sequelize) =>
    queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      date_of_expiry: {
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.BIGINT,
        onDelete:'CASCADE',
        references:{
          model:'users',
          key:'id',
          as:'user_id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down:(queryInterface/*, Sequelize*/)=> 
    queryInterface.dropTable('books'),
  
};
