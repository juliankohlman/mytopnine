const { server } = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/MyTopNine');

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
