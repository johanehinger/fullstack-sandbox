const express = require("express");
const todoListController = require("../controllers/todoListController");
const router = express.Router();

router.get("/todos/getPersonalTodos", todoListController.getPersonalTodos);
router.post("/todos/saveToDoList", todoListController.saveToDoList);
router.delete("/todos/deleteTodo", todoListController.deleteTodo);

module.exports = router;
