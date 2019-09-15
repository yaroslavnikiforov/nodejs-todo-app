module.exports = function todoController(app) {
  const bodyParser = require("body-parser");
  const mongoose = require("mongoose");

  // connect to the database
  mongoose.connect(
    "mongodb+srv://yaroslav:88888888zaq1xsw2cde3vfr4@cluster0-kkm1s.gcp.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  // create a schema

  const todoSchema = mongoose.Schema({
    item: String
  });

  const Todo = mongoose.model("Todo", todoSchema);

  const urlencoder = bodyParser.urlencoded({ extended: false });

  app.get("/todo", (req, res) => {
    Todo.find({}, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.render("todo", { todos: data });
      }
    });
  });

  app.post("/todo", urlencoder, (req, res) => {
    const newTodo = Todo(req.body).save((err, data) => {
      if (err) {
        throw err;
      } else {
        res.json(data);
      }
    });
  });

  app.delete("/todo/:item", (req, res) => {
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(
      (err, data) => {
        if (err) {
          throw err;
        } else {
          res.json(data);
        }
      }
    );
  });
};
