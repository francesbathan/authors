const express = require("express");
const cors = require("cors");
const app = express();

/**********************************/
require("./server/config/mongoose.config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./server/routes/authors.routes")(app);

/*********************************/

app.listen(8000, () => {
  console.log("Now live at Port 8000.");
});
