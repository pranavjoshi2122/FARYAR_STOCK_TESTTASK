const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
app = express();
app.use(cors('*'))

app.use(bodyParser.json());

require('./routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started at port ${port}`));
