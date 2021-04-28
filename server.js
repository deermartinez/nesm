const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");
const Selections = db.Selections;
const Op = db.Sequelize.Op;

db.sequelize.sync

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
var corsOptions = {
  origin: "http://localhost:8081"
};
var path = require('path');





// CHANGE HERE
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");



// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const dbConfig = require("./con/db.config.js");

const Sequelize= require('sequelize');
// const sequelize = new Sequelize({
//     host:'localhost',

//this is from sequelize example. change as needed. 

    // dialect:'sqlite',
    // storage: './database.sqlite'
// });
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});



//authenticate database
sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully');
})
.catch(err => {
    console.error('Unable to connect to the database:',err);
});

//set up model for mapping
module.exports = (sequelize, Sequelize) => {
  const Services = sequelize.define("services", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    worker: {
      type: Sequelize.STRING
    }
  });

  return Services;
};

//Authenticate database
//create services
//.sync is syncronizing/adding all the defined models to the database
//similar to insert in sql
//adding all of the information we put in teh database
// sequelize.sync({force:true})
// .then(()=>{
//     console.log('Database and tables have been created')
    

//     Services.bulkCreate([
//         {type:'Note for XXX XXX XXXXX', description:'noteONe',worker:'noteOneName',age: 20},
//         {type:'Note two description',description:'noteTwoTag',worker:'worker'}
//     ]).then(function(){
//         return Services.findAll();
//     }).then(function(services){
//         console.log(services)
//     });
// });





// ROUTES HERE
app.get("/", (req, res)=>{
  res.json({ message: 'Welcome to  application.New message Go to "/home"! ' });
});

app.get('/home', (req, res)=> {
 
  // res.sendFile(path.join(__dirname + './views/contact.html'));
  res.render('index')

});
app.get('/contact', (req, res)=>{

  // res.sendFile(path.join(__dirname + '/views/contact.html'));
  res.render('contact')

});






// Create and Save a new Tutorial
exports.create = (req, res) => {
  
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};


exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const selections = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    // Save Tutorial in the database
    Selections.create(selections)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the selection."
        });
      });
  };


  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Selections.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving selection."
        });
      });
  };


//   Find a single Tutorial with an id:

exports.findOne = (req, res) => {
  const id = req.params.id;

  Selections.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Selection with id=" + id
      });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Selections.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Selection was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Selection with id=${id}. Maybe Selection was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Selection with id=" + id
        });
      });
  };



  exports.delete = (req, res) => {
  const id = req.params.id;

  Selections.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Selection was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Selection with id=${id}. Maybe Selection was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Selection with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {
    Selection.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Selections were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Selections."
        });
      });
  };



  exports.findAllPublished = (req, res) => {
  Selection.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving selection."
      });
    });
};








app.listen(PORT, () => {
  console.log(`APP is running on port ${PORT}.`);
});