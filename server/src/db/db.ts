import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/chatapp_test_6';

export const connectDb = () => {
  mongoose.connect(uri);

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('Database is online');
  });
}

export const closeDb = () => {
  return mongoose.connection.close();
}

export default { connectDb, closeDb };
