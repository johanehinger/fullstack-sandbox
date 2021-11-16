import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  card: {
    margin: "1rem",
  },
  todoLine: {
    display: "flex",
    alignItems: "center",
  },
  textField: {
    flexGrow: 1,
  },
  standardSpace: {
    margin: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
});

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const timerId = setTimeout(() => {
        saveToDoList(toDoList.id, { todos });
      }, 2000);
      return () => {
        clearTimeout(timerId);
      };
    } else {
      isMounted.current = true;
    }
  }, [saveToDoList, toDoList.id, todos]);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveToDoList(toDoList.id, { todos });
  };

  const deleteTodo = (id, index) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, index: index }),
    };
    fetch("http://localhost:3001/api/todos/deleteTodo", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data.message);
        setTodos([
          // immutable update
          ...todos.slice(0, index),
          ...todos.slice(index + 1),
        ]);
      })
      .catch((error) => {
        error.json().then((data) => {
          console.error(data.message);
        });
      });
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">{toDoList.title}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((data, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant="h6">
                {index + 1}
              </Typography>
              <TextField
                style={
                  data.done
                    ? {
                        textDecorationLine: "line-through",
                        textDecorationStyle: "solid",
                      }
                    : null
                }
                label="What to do?"
                value={data.name}
                onChange={(event) => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    { name: event.target.value, done: data.done },
                    ...todos.slice(index + 1),
                  ]);
                }}
                className={classes.textField}
              />
              <input
                type="checkbox"
                checked={data.done}
                onChange={(event) => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    { name: data.name, done: event.target.checked },
                    ...todos.slice(index + 1),
                  ]);
                }}
              />
              <Button
                size="small"
                color="secondary"
                className={classes.standardSpace}
                onClick={() => {
                  deleteTodo(toDoList.id, index);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                setTodos([...todos, { name: "", done: false }]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
