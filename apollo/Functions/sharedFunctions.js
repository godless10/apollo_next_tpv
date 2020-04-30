const { v4: uuidv4 } = require("uuid");
import { db, Timestamp } from "../../firebase/firebase";

//Function to merge any new data to the corresponding model of an object
const checkObject = (model, obj) => {
  Object.getOwnPropertyNames(model).forEach((val, idx, array) => {
    if (typeof obj[val] !== "undefined") {
      model[val] = obj[val];
    }
  });
  return model;
};
module.exports = checkObject;

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////   COLLECTION QUERIES   ////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
module.exports.getAll_Collection = async ({ collection }) => {
  let collectionDocs = [];

  try {
    const snap = await db.collection(collection).get();
    if (snap) {
      snap.forEach((doc) => {
        collectionDocs.push(doc.data());
      });
    } else {
      console.log("Do Not Exist In DB");
    }
    return collectionDocs;
  } catch (error) {
    console.log(error.message);
    return collectionDocs;
  }
};

module.exports.getDoc_Collection = async ({ id, collection }) => {
  let collectionDoc = null;
  try {
    const doc = await db.collection(collection).doc(id).get();
    if (doc.exists) {
      collectionDoc = doc.data();
    } else {
      console.log("no such document");
    }

    return collectionDoc;
  } catch (error) {
    console.log(error.message);
    return collectionDoc;
  }
};

module.exports.touchDoc_Collection = async ({
  model,
  inputData,
  collection,
}) => {
  let newModel = checkObject(model, inputData);
  try {
    if (!newModel.id) {
      newModel.id = `${collection}.${newModel.nombre.replace(
        /\s/g,
        "_"
      )}.${uuidv4()}`;
    } else {
      newModel.modified = Timestamp.fromDate(new Date());
    }

    await db.collection(collection).doc(newModel.id).set(newModel);

    return {
      success: true,
      message: `${collection} Agregad@ EXITOSAMENTE:`,
      object: newModel,
    };
  } catch (error) {
    return {
      success: false,
      message: `ERROR agregando ${collection}: ${error}`,
      object: inputData,
    };
  }
};

module.exports.delDoc_Collection = async ({ id, collection }) => {
  let collectionDoc = null;

  try {
    const doc = await db.collection(collection).doc(id).get();
    if (doc.exists) {
      collectionDoc = doc.data();
      await db.collection(collection).doc(id).delete();
    } else {
      console.log("no such document");
      return {
        success: false,
        message: `DOCUMENTO NO ENCONTRADO ID: ${id}`,
      };
    }
    return {
      success: true,
      message: `${collection} ELIMINAD@ EXITOSAMENTE:`,
    };
  } catch (error) {
    return {
      success: false,
      message: `ERROR ELIMINANDO ${collection}: ${error}`,
    };
  }
};

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////   SUB-COLLECTION QUERIES   ////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

module.exports.getAll_subCollection = async ({ collection }) => {
  let collectionDocs = [];

  try {
    const snap = await db.collectionGroup(collection).get();
    if (snap) {
      snap.forEach((doc) => {
        collectionDocs.push(doc.data());
      });
    } else {
      console.log("Do Not Exist In DB");
    }
    console.log(collectionDocs);
    return collectionDocs;
  } catch (error) {
    console.log(error.message);
    return collectionDocs;
  }
};

module.exports.getDoc_subCollection = async ({ id, collection }) => {
  let collectionDoc = null;

  try {
    const snap = await db
      .collectionGroup(collection)
      .where("id", "==", id)
      .get();

    console.log(snap.docs[0].data());
    if (!snap.empty) {
      collectionDoc = snap.docs[0].data();
    } else {
      console.log("no such document");
    }

    return collectionDoc;
  } catch (error) {
    console.log(error.message);
    return collectionDoc;
  }
};
