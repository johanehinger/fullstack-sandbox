import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import { ToDoListForm } from "./ToDoListForm";
import { Button, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  textField: {
    flexGrow: 1,
  },
});

export const ToDoLists = ({ style }) => {
  const classes = useStyles();
  const [toDoLists, setToDoLists] = useState({});
  const [activeList, setActiveList] = useState();
  const [listName, setListName] = useState("");

  useEffect(() => {
    getPersonalTodos();
  }, []);

  const getPersonalTodos = () => {
    fetch("http://localhost:3001/api/todos/getPersonalTodos")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setToDoLists(data.data);
      })
      .catch((error) => {
        error.json().then((data) => {
          console.error(data.message);
        });
      });
  };

  const saveToDoList = (id, { todos }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, todos: { todos } }),
    };
    fetch("http://localhost:3001/api/todos/saveToDoList", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        error.json().then((data) => {
          console.error(data.message);
        });
      });
  };

  const addTodoList = (id, title, todos) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, title: title, todos: todos }),
    };
    fetch("http://localhost:3001/api/todos/addTodoList", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data.message);
        setToDoLists(data.data);
      })
      .catch((error) => {
        error.json().then((data) => {
          console.error(data.message);
        });
      });
  };

  if (!Object.keys(toDoLists).length) return null;
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component="h2">My ToDo Lists</Typography>
          <List>
            {Object.keys(toDoLists).map((key) => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={toDoLists[key].title} />
              </ListItem>
            ))}
            <TextField
              label="New list?"
              value={listName}
              onChange={(event) => {
                setListName(event.target.value);
              }}
              className={classes.textField}
            />
            <Button
              color="primary"
              onClick={() => {
                // WARNING, not the optimal way to update the todo list, but it will
                // do for demonstration purposes.
                const newKey = Date.now().toString();
                addTodoList(newKey, listName, []);
                setListName("");
              }}
            >
              Add new list <AddIcon />
            </Button>
          </List>
        </CardContent>
      </Card>
      {toDoLists[activeList] && (
        <ToDoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          toDoList={toDoLists[activeList]}
          saveToDoList={saveToDoList}
        />
      )}
    </Fragment>
  );
};
