const db = require("../mock_database/mockDatabase");

module.exports.getPersonalTodos = (req, res) => {
  db.getPersonalTodos()
    .then((data) => {
      res.status(200).json({
        message: "Personal todos fetched successfully.",
        data: data,
      });
    })
    .catch((error) => {
      res
        .status(404)
        .json({ message: "Fetch personal todos failed.", error: error });
    });
};

module.exports.saveToDoList = (req, res) => {
  id = req.body.id;
  todos = req.body.todos;
  db.saveToDoList(id, todos)
    .then((_) => {
      res.status(200).json({ message: "Todo list successfully saved." });
    })
    .catch((error) => {
      res.status(400).json({ message: "Save todos failed.", error: error });
    });
};

module.exports.deleteTodo = (req, res) => {
  id = req.body.id;
  index = req.body.index;
  console.log("id: ", id);
  console.log("index: ", index);
  db.deleteTodo(id, index)
    .then((_) => {
      res.status(200).json({ message: "Todo successfully deleted." });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to delete todo.", error: error });
    });
};
