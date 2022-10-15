module.exports = app => {
    const todo = require("../controllers/todo.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", todo.findAll);
  
    router.get("/:id", todo.findOne);

    router.post("/", todo.create);
    
    router.delete("/:id", todo.delete);
    
    router.patch("/:id", todo.update);
  
    app.use('/todo-items', router);
  };