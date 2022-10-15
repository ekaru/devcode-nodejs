module.exports = app => {
    const activity = require("../controllers/activity.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", activity.findAll);
  
    router.get("/:id", activity.findOne);

    router.post("/", activity.create);
    
    router.delete("/:id", activity.delete);
    
    router.patch("/:id", activity.update);
  
    app.use('/activity-groups', router);
  };