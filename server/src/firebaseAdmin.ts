import * as admin from 'firebase-admin';

const serviceAccount = require('../medusa-ae9cc-firebase-adminsdk-37fsr-bf99698e12.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://medusa.europe-west1.firebasedatabase.app",
});

export default admin