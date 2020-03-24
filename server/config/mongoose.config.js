const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/crmdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  })
  .then(() => console.log("Established a connection to the database."))
  .catch(error =>
    console.log("Something went wrong when connecting to the database.", error)
  );
