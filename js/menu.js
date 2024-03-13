import { app, appName, cid } from "./config.js";
import { getFirestore, doc, getDoc,getDocs, setDoc, addDoc, collection, Timestamp, serverTimestamp, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getDatabase, set, ref, child, get,update, serverTimestamp as sT } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
const database = getDatabase(app);

const db = getFirestore(app);


