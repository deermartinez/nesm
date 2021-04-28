const db = require("../models");
const Selections = db.Selections;
const Op = db.Sequelize.Op;

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




