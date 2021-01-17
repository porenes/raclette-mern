const mongoose = require('mongoose');
module.exports = () => {
    console.log("Trying to connect to Mongo on :"+process.env.MONGO_URI )
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      // we're connected!
      console.log("👍🏻 DB is working !")
      return db;
    });
}