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

  const itemOne = Todo({ item: "buy flowers" }).save(err => {
    if (err) {
      throw err;
    } else {
      console.log("item saved");
    }
  });

  let data = [
    { item: "get milk" },
    { item: "walk dog" },
    { item: "kick some coding ass" }
  ];

  const urlencoder = bodyParser.urlencoded({ extended: false });

  app.get("/todo", (req, res) => {
    res.render("todo", { todos: data });
  });

  app.post("/todo", urlencoder, (req, res) => {
    data.push(req.body);

    res.json(data);
  });

  app.delete("/todo/:item", (req, res) => {
    data = data.filter(
      todo => todo.item.replace(/ /g, "-") !== req.params.item
    );

    res.json(data);
  });
};
