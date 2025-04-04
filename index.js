"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUserAcc = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const firestoreRef = admin.firestore();
exports.createNewUserAcc = functions.region("asia-south1").auth.user().onCreate(async (data) => {
    console.log(data);
    const metadata = data.metadata;
    let Provider;
    if (data.providerData[0] !== null) {
        Provider = data.providerData[0];
    }
    const uid = data.uid;
    const email = data.email;
    const displayName = data.displayName || "not available";
    const emailVerified = data.emailVerified || false;
    const createdAt = metadata.creationTime || "not available";
    const lastSignedInAt = metadata.lastSignInTime || "not available";
    const photoURL = data.photoURL || "not available";
    const mobileNumber = data.phoneNumber || "not available";
    const providerId = Provider ? Provider.providerId : "Manual Email Sign up";
    const firestoreData = await firestoreRef.collection("users").doc(uid).set({
        displayName: displayName,
        email: email,
        emailVerified: emailVerified,
        photoURL: photoURL,
        mobileVerified: false,
        mobileNumber: mobileNumber,
        createdAt: createdAt,
        lastSignedInAt: lastSignedInAt,
        providerId: providerId,
        storeCredits: 0,
        OTP: 999999,
        uid: uid,
        admin: false
    });
    return firestoreData;
});
//# sourceMappingURL=index.js.map