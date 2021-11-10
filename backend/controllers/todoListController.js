module.exports.getPersonalTodos = (req, res) => {
  res.status(200).json({
    message: "Personal todos fetched successfully.",
    data: {
      "0000000001": {
        id: "0000000001",
        title: "First List",
        todos: ["First todo of first list!"],
      },
      "0000000002": {
        id: "0000000002",
        title: "Second List",
        todos: ["First todo of second list!"],
      },
    },
  });
};
