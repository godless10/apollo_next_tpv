const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

//console.log(` !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! afuera de la inicializacion de firebase con admin.apps.length: ${admin.apps.length}`);

if (!admin.apps.length) {
  console.log(" !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! iniciando app firebase");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tpvtest-3909d.firebaseio.com",
  });
}

//console.log( ` !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! saliendo de la inicializacion de admin firebase para el proyecto: ${admin.firestore()._settings.projectId}`);

//Time object for firebase
export const Timestamp = require("firebase-admin").firestore.Timestamp;

//firestore data base
export const db = admin.firestore();

//Bucket de storage asociado a fireStorage
export const fireBucket = admin.storage().bucket('tpvtest-3909d.appspot.com');


