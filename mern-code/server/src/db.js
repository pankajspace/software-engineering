const mongoose = require('mongoose');

const dbuser = process.env.dbuser;
const dbpass = process.env.dbpass;
const URI = `mongodb+srv://${dbuser}:${dbpass}@cluster0.nurvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

async function connect() {
  try {
    await mongoose.connect(URI, { dbName: 'mern' });
    console.log("Connected to successfully!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { connect };
