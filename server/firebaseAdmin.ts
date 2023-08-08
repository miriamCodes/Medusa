import * as admin from 'firebase-admin';

const serviceAccount = require('./secret.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://medusa.europe-west1.firebasedatabase.app",
});

export default admin