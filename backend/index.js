const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoListRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

app.use("/api", todoRoutes);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
