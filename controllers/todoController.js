module.exports = function todoController(app) {
  const bodyParser = require("body-parser");

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
