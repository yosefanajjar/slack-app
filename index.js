const app = require("./app");

const PORT = process.env.PORT || 8558;

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
