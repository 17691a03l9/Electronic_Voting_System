module.exports = app => {
    const voting = require("../controllers/voting.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/insert", voting.create);
  
    // router.post("/", voting.findAllBy);
    // router.get("/:id", voting.findOne);
    // router.put("/update/:id", voting.update);
    
    // Retrieve all Tutorials
    //router.get("/", users.findAll);

    // Retrieve all published Tutorials
    router.get("/published", voting.findAllPublished);
    /*
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);
  */
    app.use('/api/votings', router);
  };
  