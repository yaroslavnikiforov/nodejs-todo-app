const data = [
  { item: "get milk" },
  { item: "walk dog" },
  { item: "kick some coding ass" }
];

module.exports = function todoController(app) {
  app.get("/todo", (req, res) => {
    res.render("todo", { todos: data });
  });

  app.post("/todo", (req, res) => {});

  app.delete("/todo/:id", (req, res) => {});
};
