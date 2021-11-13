// mock database to simulate async communication.

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

var data = {
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
};

module.exports.getPersonalTodos = () => {
  return sleep(1000).then(() => Promise.resolve(data));
  // Mock database rejection.
  // return sleep(1000).then(() =>
  //   Promise.reject({
  //     errorMessage: "Something went wrong!",
  //   })
  // );
};

module.exports.saveToDoList = (id, { todos }) => {
  return sleep(1000).then(() => {
    const listToUpdate = data[id];
    data = {
      ...data,
      [id]: { ...listToUpdate, todos },
    };
    Promise.resolve();
  });
  // Mock database rejection.
  // return sleep(1000).then(() =>
  //   Promise.reject({
  //     errorMessage: "Something went wrong!",
  //   })
  // );
};

module.exports.deleteTodo = (id, index) => {
  return sleep(1000).then(() => {
    data[id].todos = [
      ...data[id].todos.slice(0, index),
      ...data[id].todos.slice(index + 1),
    ];
    Promise.resolve();
  });
  //  Mock database rejection.
  // return sleep(1000).then(() =>
  //   Promise.reject({
  //     errorMessage: "Something went wrong!",
  //   })
  // );
};
