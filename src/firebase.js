import Firebase from "firebase";

require("firebase/firestore");

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const firebase = Firebase.initializeApp(firebaseConfig);

export default firebase;

const db = firebase.firestore();
const messagesCollection = db.collection("messages");

export function getMessages() {
  console.log("get");
  return messagesCollection.get().then(querySnapshots => {
    let messages = [];

    querySnapshots.forEach(doc => {
      const data = doc.data();

      messages.push({
        ...data,
        id: doc.id
      });
    });

    return messages;
  });
}

export function addMessage(message) {
  messagesCollection.add({
    text: message,
    timestamp: new Date()
  });
}
