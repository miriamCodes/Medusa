import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/chatapp_test_6';

const db = () => {
    mongoose.connect(uri);

    const db = mongoose.connection;

    db.on('connected', () => {
        console.log('Database is online');
    });

}

export default db;