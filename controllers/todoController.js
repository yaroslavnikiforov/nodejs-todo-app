module.exports = function todoController(app) {
  app.get("/todo", (req, res) => {
    res.render("todo");
  });

  app.post("/todo", (req, res) => {});

  app.delete("/todo/:id", (req, res) => {});
};
