const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.userCreated = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    const newUser = snap.data();
    console.log('A new user ' + newUser.email + ' was just created!');

    return Promise.resolve(0);
  });

exports.serverCreated = functions.firestore
  .document('servers/{serverId}')
  .onCreate((snap, context) => {
    const newServer = snap.data();
    console.log(
      'A new server ' +
        newServer.displayName +
        '@' +
        newServer.address +
        ' was just created!'
    );

    return Promise.resolve(0);
  });
