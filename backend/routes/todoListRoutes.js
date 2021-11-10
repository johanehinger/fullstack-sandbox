const express = require("express");
const todoListController = require("../controllers/todoListController");
const router = express.Router();

router.get("/todos/getPersonalTodos", todoListController.getPersonalTodos);

module.exports = router;
