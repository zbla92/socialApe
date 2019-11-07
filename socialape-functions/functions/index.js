const functions = require('firebase-functions'); 

const app = require('express')();

const FBAuth = require('./util/fbAuth')

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login } = require('./handlers/users');

// Scream routs
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);

// Users route
app.post('/signup', signup);
app.post('/login', login);


exports.api = functions.region('europe-west1').https.onRequest(app);