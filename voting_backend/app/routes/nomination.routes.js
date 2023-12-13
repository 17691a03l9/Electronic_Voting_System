module.exports = app => {
    const nomination = require("../controllers/nomination.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/insert", nomination.create);
  
    // router.post("/", nomination.findAllBy);
    // router.get("/:id", nomination.findOne);
    router.put("/update/:id", nomination.update);
    
    // Retrieve all Tutorials
    //router.get("/", users.findAll);

    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllP ublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", nomination.findOne);
    /*
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);
  */
    app.use('/api/nominations', router);
  };
  