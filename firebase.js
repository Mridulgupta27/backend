var admin = require("firebase-admin");
const {getFirestore} = require("firebase-admin/firestore")

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = getFirestore();

const verifyAppCheckToken = async (req, res, next) => {
  const appCheckToken = req.header(X-Firebase-AppCheck);

  if (!appCheckToken) {
    return res.status(403).send('App Check token missing');
  }

  try {
    await admin.appCheck().verifyToken(appCheckToken);
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('App Check verification failed:', error);
    return res.status(403).send('Unauthorized request');
  }
};
console.log(verifyAppCheckToken);

module.exports={
  db,
  verifyAppCheckToken
};