const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/Story', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connect success');
  })
  .catch((err) => console.log(err));
