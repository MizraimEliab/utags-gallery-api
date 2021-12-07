
var admin = require("firebase-admin");

var serviceAccount = require("./keys/utags-gallery-firebase-adminsdk-nktwh-0b28ab8b14.json");

function initFirebase() {
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
}

initFirebase();

function SendPushToOneUser() {
    const message = {
        toke: notification.tokenId,
        data: {
            title: notification.title,
            message: notification.message
        }
    }
    sendMessage(message)
}


function SendPushToTopic() {
    const message = {
        topic: notification.topic,
        data: {
            title: notification.title,
            message: notification.message
        }
    }
    sendMessage(message)
}


function sendMessage(message) {
    admin.messaging().send(message)
    .then((response)=>{
        console.log("Message sending: " + response);
    })
    .catch((error)=>{
        console.log("Error while sending message " + error);
    })
}
module.exports = {SendPushToOneUser, SendPushToTopic}