// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { executeMutation } from "firebase/data-connect";
import { TryRounded } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getStorage } from "firebase/storage"






// const firebaseConfig = {
//   apiKey: "AIzaSyDJjXfLvpI_V_vDXuE-r-PJU0_ggRJoE7Y",
//   authDomain: "event-management-system-12682.firebaseapp.com",
//   projectId: "event-management-system-12682",
//   storageBucket: "event-management-system-12682.appspot.com",
//   messagingSenderId: "570359696058",
//   appId: "1:570359696058:web:6b2b2d7437690825949083",
//   measurementId: "G-T4Z97DCXL1"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDaS3S90l1KJcZohUwMtWpqmTJFDbYJCcA",
  authDomain: "lost-items-app.firebaseapp.com",
  projectId: "lost-items-app",
  storageBucket: "lost-items-app.appspot.com",
  messagingSenderId: "375746041352",
  appId: "1:375746041352:web:574c31589861368e0963bd",
  measurementId: "G-GX3LTTVT30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
const auth = getAuth(app);
export const storage = getStorage(app);

export async function getuser() {
  const userCol = collection(firestore, 'user');
  const userSnapshot = await getDocs(userCol);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList;
}

export async function signupuser(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
      // console.log (" this is the user", user )
      return user
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorMessage)
      return errorMessage
    });
}


export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log("in the firebase.js", userCredential.user)
    return userCredential.user
  } catch (error) {
    const err = { errorCode: error.code, errorMessage: error.message }
    console.log(err)
    throw new Error(err.errorCode + "" + err.errorMessage)
  }
}
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log('in the firebase.js', userCredential)
    console.log(userCredential.user)
    return userCredential.user
  } catch (error) {
    const err = { errorCode: error.code, errorMessage: error.message }
    // console.log(err)
    throw new Error(err.errorCode + "" + err.errorMessage)
  }
}

export const addUser = async (userId, username, email, password, phoneNumber) => {
  // parameters of the function 
  const user = {
    username,
    email,
    password,
    phoneNumber
  }
  try {
    const docRef = doc(firestore, "user", userId)
    await setDoc(docRef, user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap)
      console.log("Document data:", docSnap.data());
      localStorage.setItem('emsUser', JSON.stringify({ ...docSnap.data(), id: docSnap.id }))
      return { ...docSnap.data(), id: docSnap.id }
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  catch (error) {
    console.log(error)
  }
}

// console.log("console logging the id of the loggedin user", userloggedin)

export const handleEventImageUpload = async (imageFile) => {
  if (!imageFile) return null;
  const storageRef = ref(storage, `emmy-ems-images/event-thumbnails/${imageFile.name + Date.now().toString()}`)
  try {
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl
  } catch (err) {
    console.error("error uploading image: ", err)
    // throw new Error(err.errorCode + "" + err.errorMessage)
    throw new Error(err.errorCode + "" + err.errorMessage)
  }
}

export const handleProfileImageUpload = async (imageFile) => {
  if (!imageFile) return null;
  const storageRef = ref(storage, `emmy-ems-images/user-profiles/${imageFile.name + Date.now().toString()}`)
  try {
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl
  } catch (error) {
    console.error("error uploading image: ", error)
    return null
  }
}

export const addEvent = async (
  title, categories, type, isPaid,
  fee, location, startdate,
  enddate, starttime, endtime,
  description, userID, imageFile) => {
  const imageUrl = await handleEventImageUpload(imageFile)
  //if the image was not stored successfully, leave the function without attempting to create the event.
  if (!imageUrl) return;
  const Event = {
    title, categories, type, isPaid,
    fee, location, startdate, enddate,
    starttime, endtime,
    description, userID, imageUrl
  }
  try {
    const docRef = await addDoc(collection(firestore, "event"), Event);
    console.log("Document written with ID: ", docRef.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap)
      console.log("Document data:", docSnap.data());
      // localStorage.setItem('emsUser', JSON.stringify({ ...docSnap.data(), id: docSnap.id }))
      return { ...docSnap.data(), id: docSnap.id }
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (err) {
    console.error("Error adding document: ", err);
    throw new Error(err)
  }
}

export const fetchUser = async (userId) => {
  try {
    const docRef = doc(firestore, "user", userId)// just a reference to the user document and not the document itself. userID points to the address of the document
    const docSnap = await getDoc(docRef);// this line of code gets the information from the reference(getdoc) and stores inside docsnap
    if (docSnap.exists()) {
      console.log(docSnap)
      console.log("Document data:", docSnap.data());
      localStorage.setItem('emsUser', JSON.stringify({ ...docSnap.data(), id: docSnap.id }))
      return { ...docSnap.data(), id: docSnap.id }
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const fetchEvents = async () => {
  let events = []
  let eventsWithOrganizers = []
  const querySnapshot = await getDocs(collection(firestore, "event"));
  try {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log("info from the fetchevent function", doc.id, " => ", doc.data());
      events.push({ id: doc.id, ...doc.data() })
    });
    console.log(events)
    console.log(eventsWithOrganizers)
    return events
  }
  catch (error) {
    throw new Error(error)
  }
}

