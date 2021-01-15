const mongoose = require('mongoose');
module.exports = () => {

    mongoose.connect('mongodb://localhost/raclette', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      // we're connected!
      console.log("👍🏻 DB is working !")
      return db;
    });
}