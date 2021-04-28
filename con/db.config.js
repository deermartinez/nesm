module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "123456",
    DB: "testdb",
    dialect: "mysql",

    //^^^^ are going to be applied to mysql connection
    pool: {
        //sequelize connection poopl config
      max: 5,
      //max number of connection in pool
      min: 0,
      //min number of connection
      acquire: 30000,
      //max time pool will try to get connection ebfore throwing error
      idle: 10000
    }
  };