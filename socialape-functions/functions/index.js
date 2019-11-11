const functions = require('firebase-functions'); 
const app = require('express')();
const FBAuth = require('./util/fbAuth');

const { db } = require('./util/admin')

const { getAllScreams, postOneScream, getScream, commentOnScream, likeScream, unlikeScream, deleteScream } = require('./handlers/screams');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users');

// Scream routs
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);
app.delete('/scream/:screamId', FBAuth, deleteScream);
app.get('/scream/:screamId/like', FBAuth, likeScream);
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);


// Users route
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);


exports.api = functions.region('europe-west1').https.onRequest(app);

exports.createNotificationOnLike = functions.region('europe-west1').firestore.document(`likes/{id}`)
    .onCreate(snapshot => {
        db.doc(`scream/${snapshot.data().screamId}`).get()
            .then( doc => {
                if(doc.exists){
                    return db.doc(`notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandler,
                        sender: snapshoit.data().userHandler,
                        type: 'like',
                        read: false,
                        screamId: doc.id
                    })
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return 
            })
    })
exports.deleteNotificationOnUnlike = functions.region('europe-west1').firestore.document('likes/{id}')
    .onDelete(snapshot => {
        db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .then(() => {
                return
            })
            .catch(err => {
                console.error(err);
                return
            })
    })

exports.createNotificationOnComment = functions.region('europe-west1').firestore.document(`comments/{id}`)
    .onCreate(snapshot => {
        db.doc(`/screams/${snapshot.data().screamId}`).get()
        .then(doc => {
            if(doc.exists){
                return db.doc(`/notifications/${snapshot.if}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: doc.data().userHandler,
                    sender: snapshoit.data().userHandler,
                    type: 'comment',
                    read: false,
                    screamId: doc.id
                })
            }
        })
    })

