const User = require("../models/user.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Tutorial
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    voter_id: req.body.voter_id,
    fullname: req.body.fullname,
    dob: req.body.dob,
    email_id: req.body.email_id,
    candidate:req.body.candidate,
  });

  // Save Tutorial in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};

// Retrieve all users from the database (with condition).
exports.findAll = (req, res) => {
  //const title = 'req.query.title';
  const username = "";
  User.getAll(username, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

//OTP
exports.findAllBy = (req, res) => {
  const otpID=req.body.id
  //const title = 'req.query.title';
const email_id ='';
const password ='';
  User.getAllByUser(email_id,password,otpID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// LOGIN
exports.findAllByLogin = (req, res) => {
  //const title = 'req.query.title';
const email_id ='';
const password ='';
  User.getAllByUsername(email_id,password, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

//  exports.creates = (req, res) => {
// //   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!",
//     });
//   }
//   const users = new User({
//     username: req.body.username,
//     password: req.body.password,
//     voter_id: req.body.voter_id,
//     fullname: req.body.fullname,
//     dob: req.body.dob,
//     email_id: req.body.email_id,
//     user_type: 3,
//     candidate: 1,
//   });

//   User.creates(users, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial.",
//       });
//     else res.send(data);
//   });
// }

// Find a single Tutorial by Id
// exports.findOne = (req, res) => {
//   Tutorial.findById(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id " + req.params.id
//         });
//       }
//     } else res.send(data);
//   });
// };


// find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};
/*
// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Tutorial.updateById(
    req.params.id,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};*/
