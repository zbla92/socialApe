const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(require('./socialape-3a0cd-firebase-adminsdk-eeo1k-e1c6016bd6.json'))
});

const db = admin.firestore();

module.exports = { admin, db };