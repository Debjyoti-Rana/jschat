import { app, appName, cid } from "./config.js";
// import { getDatabase, serverTimestamp, set, ref, child, get, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// const database = getDatabase(app);
// import { getStorage, ref as sref, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
import { getFirestore, collection, addDoc ,doc, getDoc, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
const db = getFirestore(app);

// const docRef = doc(db, "/user", "Debraj");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");

// import { collection, query, where, getDocs } from "firebase/firestore";

const q = query(collection(db, "profile"), where("username", "==", "Debraj"));

const querySnapshot = await getDocs( query(collection(db, "profile"), where("username", "==", "Debraj")));
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});
// }