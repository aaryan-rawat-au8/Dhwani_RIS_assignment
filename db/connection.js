const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('......................................................................................');  
    console.log("----------------------------Database connected----------------------------------------");
    console.log('......................................................................................');
  })
  .catch((e) => {
    console.log(e.message);
  });
