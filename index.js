const express = require("express");
const app = express();
const port = 5000;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api',require('./routes/text'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
