const express = require('express');
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");

const port = 3001;

app.use(express.json());
app.use(cors());
app.use(router);
app.listen(port,()=>{
    console.log(`server start at port ${port}`);
});