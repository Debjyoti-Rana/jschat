import { app, appName, md5, cid } from "./config.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs, query, where,  DocumentReference, setDoc, addDoc, collection, Timestamp, serverTimestamp, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref as sref, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
// import {__chatmain__} from './chat.js';
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
document.getElementById("__preloader__").style.display="block";
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    sessionStorage.setItem('currentUserId', uid);
    const displayName = user.displayName;
    profileDisplay(user);
    profileInsert(uid, displayName, null, `Hey There I am using ${appName}!`, user.photoURL)
    document.getElementById("__preloader__").style.display="None";
    
  } else {
    // User is signed out
    window.location.href = "./login.html"
  }
  

});

/*Logout js start  Here*/
const LogOut = document.getElementById('LogOut');
LogOut.addEventListener("click", function () {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
});
/*Logout js end  Here*/

/*Profile Js start here */
const uploadImage = async (file, uid) => {

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: file.type,
    lastModified: file.lastModified,
    size: file.size
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = sref(storage, `profile/${uid}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  /*sweet alert auto closed=> start */
  Swal.fire({
    title: "Uploading!",
    html: `<b></b><br/><progress id="UPloadBar" value="0" max="100"></progress>`,
    icon: "info",
    didOpen: () => {
      Swal.showLoading();
      const bar = Swal.getPopup().querySelector("progress#UPloadBar");
      const textB = Swal.getPopup().querySelector("b");
      // timerInterval = setInterval(() => {
      //   timer.textContent = `${Swal.getTimerLeft()}`;
      // }, 100);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed', (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log('Upload is ' + progress + '% done');
        textB.textContent = `${progress}%`;
        bar.value = progress;
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            // Swal.fire()
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          Swal.close()
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

            updateDoc(doc(db, "profile", uid), { "imageUrl": downloadURL });
            document.getElementById("profileImg").src = downloadURL;
            // console.log('File available at', downloadURL);
            // return downloadURL;
          });
        }
      );
    },
  });
  /*sweet alert auto closed=> end */

}
const checkUsernameExist = async (username) => {
  const docRef = doc(db, "user", username);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data().uid.ref);
    const user = await getDoc(doc(db, docSnap.data().uid.ref));
    if (user.exists()) {
      if (user.data().username == username) { return true }
      else return false;
    }
    else return false;
  } else {
    return false;
  }
}
// checkUsernameExist("Debjyoti").then(data=>console.log(data)).catch(err=>console.error(err));
// checkUsernameExist("DebjyotiRANA").then(data=>console.log(data)).catch(err=>console.error(err));
// checkUsernameExist("Rajesh").then(data=>console.log(data)).catch(err=>console.error(err));
// checkUsernameExist("Ram").then(data=>console.log(data)).catch(err=>console.error(err));
const getUserProfile = async (profileid) => {

}
const profile_sub_function = (subtext, id, iconClass, text, uid) => {
  // console.log(subtext, id, iconClass, text);
  const aRow = document.createElement('div');
  aRow.classList.add('row');
  const aCol = document.createElement('div');
  aCol.classList.add('col');

  const aSubtext = document.createElement('h5');
  aSubtext.classList.add('profileSubtext');
  aSubtext.innerHTML = `<i class=${iconClass}></i>${subtext}`;

  const aText = document.createElement('p');
  aText.classList.add('profileText');
  aText.id = id;
  aText.textContent = text;
  if (subtext != "Email") {
    aText.addEventListener("click", async (event) => {
      event.preventDefault();
      const { value: NameValue } = await Swal.fire({
        title: `Do you want to update your ${subtext}?`,
        input: "text",
        inputLabel: `Enter Your ${subtext}`,
        inputValue: aText.textContent,
        showCancelButton: true,
        confirmButtonText: "Update",
        inputValidator: async (value) => {
          if (!value) {
            return "You need to write something!";
          }
          if (value == aText.textContent) return "Can't be remain same!";
          if (subtext == "Phone" && isNaN(value)) return "Must be a number";
          // if(subtext=="Username") ;
        }
      });
      if (NameValue) {

        if (subtext == "About") updateDoc(doc(db, "profile", uid), { "about": NameValue }).then(aText.textContent = NameValue);
        if (subtext == "Phone") updateDoc(doc(db, "profile", uid), { "phone": parseInt(NameValue) }).then(aText.textContent = NameValue);
        // Swal.fire(`Your name update succesful: ${profileNameValue}`);
        if (subtext == "Username") {
          await checkUsernameExist(NameValue).then(async (data) => {
            if (data) Swal.fire(`Username is already Taken: ${NameValue}`).then(e => {
              if (e.isConfirmed) aText.click();
            });
            else {
              await updateDoc(doc(db, "profile", uid), { "username": NameValue }).catch(e => console.log(e));
              await setDoc(doc(db, "user", NameValue), { uid: { ref: `/profile/${uid}` } }).catch(e => console.log(e));
            } aText.textContent = NameValue;
          })
        }
      }
    });
  }

  aCol.appendChild(aSubtext);
  aCol.appendChild(aText);

  aRow.appendChild(aCol)
  return aRow;
}

const Profile = (img, name, about, email, phone, username, uid) => {
  //set image on bar
  document.getElementById("userImageOnBar").src = img;
  const conversationContainer = document.createElement('div');
  conversationContainer.classList.add('conversation');
  conversationContainer.id = "profile"
  //set image on all chat section
  document.querySelectorAll('[alt="__toImage__"]').forEach((e => e.src = img));
  // Top section with back button and user info
  const conversationTop = document.createElement('div');
  conversationTop.classList.add('conversation-top');

  const backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.classList.add('conversation-back');
  backButton.textContent = 'Back';
  backButton.innerHTML = '<i class="ri-arrow-left-line"></i>';
  backButton.addEventListener('click', function (e) {
    e.preventDefault()
    this.closest('.conversation').classList.remove('active')
    document.querySelector('.conversation-default').classList.add('active')
  })

  const conversationUser = document.createElement('div');
  conversationUser.classList.add('conversation-user');

  const DIVa = document.createElement('div');
  const conversationUserName = document.createElement('div');
  conversationUserName.classList.add('conversation-user-name');
  conversationUserName.textContent = 'Profile';

  DIVa.appendChild(conversationUserName);

  conversationUser.appendChild(DIVa);

  conversationTop.appendChild(backButton);
  conversationTop.appendChild(conversationUser);

  conversationContainer.appendChild(conversationTop);

  // Main section with profile content
  const conversationMain = document.createElement('div');
  conversationMain.classList.add('conversation-main');

  const conversationWrapper = document.createElement('ul');
  conversationWrapper.classList.add('conversation-wrapper');

  // Image row
  const imageRow = document.createElement('div');
  imageRow.classList.add('row');

  const imageCol = document.createElement('div');
  imageCol.classList.add('col');

  const profileImg = document.createElement('img');
  profileImg.id = 'profileImg';
  profileImg.src = img;
  profileImg.classList.add('rounded', 'alt');
  profileImg.alt = 'Profile Image';
  profileImg.addEventListener("click", event => {
    // console.log(this);
    event.preventDefault();
    Swal.fire({
      text: "Let's give your profile a fresh new look with a brand new profile picture!",
      title: `Do you want to change it?`,
      // text: 'You agree to receive messages from us. You also agree to our Terms of Use and acknowledge our Privacy Policy.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#299617",
      cancelButtonColor: "#d33",
      confirmButtonText: "Let's do it",
      cancelButtonText: "No Thanks",
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        const inputFile = document.createElement('input');
        inputFile.type = "file";
        inputFile.id = "uploadProfilePicture";
        inputFile.accept = "image/*";
        inputFile.click();
        inputFile.addEventListener("change", event => {
          const imageFile = inputFile.files[0];
          // console.log(imageFile)

          const reader = new FileReader();
          reader.addEventListener('load', () => {
            const dataURL = reader.result;
            // const imgElement = document.createElement('img');
            // imgElement.src = dataURL;
            // document.body.appendChild(imgElement);
            Swal.fire({
              title: `File Name: ${imageFile.name}`,
              imageUrl: dataURL,
              imageHeight: 200,
              imageWidth: 200,
              confirmButtonText: "Upload"
            }).then(result => {
              if (result.isConfirmed) uploadImage(imageFile, uid);
              console.log(imageFile, uid)

            });
          });

          reader.readAsDataURL(imageFile);
          const file = imageFile;
          // console.log(file)
          // return file;

        })
        // console.log(result);

      }
    });
  });

  imageCol.appendChild(profileImg);
  imageRow.appendChild(imageCol);

  conversationWrapper.appendChild(imageRow);

  // Name row
  const nameRow = document.createElement('div');
  nameRow.classList.add('row');
  const nameCol = document.createElement('div');
  nameCol.classList.add('col');
  const profileName = document.createElement('h1');
  profileName.id = 'profileName';
  profileName.textContent = name;
  profileName.addEventListener("click", async (event) => {
    event.preventDefault();
    // console.log(event)
    // const ipAPI = "//api.ipify.org?format=json";
    // const response = await fetch(ipAPI);
    // const data = await response.json();
    // const inputValue = data.ip;
    const { value: profileNameValue } = await Swal.fire({
      title: "Do you want to update your name?",
      input: "text",
      inputLabel: "Enter Your FUll Name",
      inputValue: profileName.textContent,
      showCancelButton: true,
      confirmButtonText: "Update",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
        if (value == profileName.textContent) return "can't be remain same.";
      }
    });
    if (profileNameValue) {
      profileName.textContent = profileNameValue;
      updateDoc(doc(db, "profile", uid), { "name": profileNameValue });
      // Swal.fire(`Your name update succesful: ${profileNameValue}`);
    }
  });

  nameCol.appendChild(profileName);
  nameRow.appendChild(nameCol);
  conversationWrapper.appendChild(nameRow);

  //Profile About
  const profileAboutRow = profile_sub_function("About", "profileAbout", "ri-information-2-fill", about, uid)
  conversationWrapper.appendChild(profileAboutRow);
  //Profile Username
  const profileUsernameRow = profile_sub_function("Username", "profileUsername", "ri-user-fill", username, uid)
  conversationWrapper.appendChild(profileUsernameRow);

  //Profile Email
  const profileEmailRow = profile_sub_function("Email", "profileEmail", "ri-mail-fill", email, "");
  conversationWrapper.appendChild(profileEmailRow);
  //Profile Phone
  const profilePhoneRow = profile_sub_function("Phone", "profilePhone", "ri-phone-fill", phone, uid);
  conversationWrapper.appendChild(profilePhoneRow);
  //

  conversationMain.appendChild(conversationWrapper);
  conversationContainer.appendChild(conversationMain);
  return conversationContainer;
}
const profileDisplay = async (user) => {
  // console.log(user)
  const docRef = doc(db, "profile", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let data = docSnap.data();
    for (let key in data) {
      // console.log(data[key])
      if (data[key] == null) data[key] = "None";
    }
    // console.log(data)
    const profile = Profile(data.imageUrl, data.name, data.about, user.email, (user.phoneNumber == null ? (data.phone == undefined ? "None" : data.phone) : user.phoneNumber), data.username, user.uid);
    if (document.getElementById("Profile") != null) document.getElementById("Profile").remove();
    document.getElementById("chat-main").appendChild(profile);
  } else {
    return false;
  }
}
// let profileDisplay = (user) => {
//   // let profileName = document.getElementById("profileName"),
//   //   profileImg = document.getElementById("profileImg"),
//   //   profileEmail = document.getElementById("profileEmail"),
//   //   profileAbout = document.getElementById("profileAbout"),
//   //   profilePhone = document.getElementById("profilePhone");
//   if (!user.isAnonymous) {
//     // profileImg.setAttribute("src", user.photoURL);
//     // profileName.textContent = user.displayName;
//     // profileEmail.textContent = user.email;
//     // profileAbout.textContent = "Hey There, I am using Appekiu";
//     // profilePhone.textContent = user.phoneNumber == null ? "None" : user.phoneNumber;
//     let img = user.photoURL,
//     name= user.displayName;
//     email = user.email;
//     profileAbout.textContent = "Hey There, I am using Appekiu";
//     profilePhone.textContent = user.phoneNumber == null ? "None" : user.phoneNumber;
//     Profile(img,name,about,email,phone);
//   }
//   if (user.isAnonymous) {
//     profileImg.setAttribute("src", "./img/user.png");
//     profileName.textContent = `Guest ${(user.uid).slice(0, 7)}`;
//     profileEmail.textContent = `${(user.uid).slice(7,)}@appekiu`;
//     profileAbout.textContent = "Hey There, I am using Appekiu";
//   }
// }
/*Profile Js end here */

/*Welcome Menu */
let agreeBox = () => {
  Swal.fire({
    title: `Thanks for signing up!`,
    text: 'You agree to receive messages from us. You also agree to our Terms of Use and acknowledge our Privacy Policy.',
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Agree",
    cancelButtonText: "Disagree"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Successful!",
        text: "You can change your name, username in profile section.",
        icon: "success",
        showConfirmButton: false,
        timer: 2500
      });
      return true;
    } else {
      Swal.fire({
        title: "Disagree!",
        text: "Loging Out",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      });
      signOut(auth)
      return false;
    }
  });
}
//check function
var checkdata = async (uid) => {
  const ref = doc(db, "profile", uid)
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    return true;
  } return false;
}
// insert function
var profileInsert = async (uid, name, username, about, ImageURL) => {
  let data = await checkdata(uid);

  if (data == false) {
    agreeBox();
    try {
      await setDoc(doc(db, "profile", uid), {
        name: name,
        username: username,
        about: about,
        imageUrl: ImageURL,
        phone: "none"
      });
      const docSnap1 = await getDoc(doc(db, "menu", sessionStorage.getItem('currentUserId')));
    if (!docSnap1.exists()) await setDoc(doc(db, "menu", uid), {});
    } catch (e) {
      console.error("Error adding document:", e);
    }
  }
}




//get User Details;
let getUser = async (chatid) => {
  const docRef = doc(db, "profile", chatid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return false
  }


}
// console.log(getUser("icyofiZK9nblLQfj7yLWpFQE0j73"))
//Insert chat
// let sendMessage = async (to, from, date, text, messageId) => {
//   const id = chatid(to, from), object = {};
//   object[messageId] = { from, text, date: serverTimestamp() };

//   try {
//     // await setDoc(doc(db, "chat", id,), object);
//     await updateDoc(doc(db, "chat", id), object);
//   } catch (e) {
//     console.error("Error adding document:", e);
//     console.log(e)
//   }
// }
// let getMessage = async (chatid) => {
//   const docRef = doc(db, "chat", chatid);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     return docSnap.data();
//   } else {
//     return false
//   }
// }

// import { doc, onSnapshot } from "firebase/firestore";

// const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
//     console.log("Current data: ", doc.data());
// });

// console.log(getMessage("152672f7682214f6c0aacdf695086594"))
// sendMessage("icyofiZK9nblLQfj7yLWpFQE0j73", "icyofiZK9nblLQfj7yLWpFQE0j73", "01-Dec-2021", "Hi", "2")
/*unicast chat end here */
/*Chat Menu start Here */
import { getMenu, chat as chart , newuserfound} from "./chat.js";

const currentUserId = sessionStorage.getItem('currentUserId'),current_menu_uid = [];
console.log(currentUserId)
/** GET The current user from session storage */
// getMenu(currentUserId).then(chat => {
//   /*Get the menu and display*/
//   let current_menu_uid = [];
//   for (let key in chat) {
//     let to_uid = chat[key].ref.split("/")[2];
    
//       current_menu_uid.push(to_uid);
//       let chatid = [currentUserId, to_uid];
//       let conversation_Menu = new chart(chatid);
      
//       if(!current_menu_uid.includes(to_uid)){}
//   }
  
// });

const chatmenu_websocket = onSnapshot(doc(db, "menu", currentUserId), (doc) => {
  const chat = doc.data()
  for (let key in chat) {
    let to_uid = chat[key].ref.split("/")[2];
      if(!current_menu_uid.includes(to_uid)){
        current_menu_uid.push(to_uid);
      let chatid = [currentUserId, to_uid];
      let conversation_Menu = new chart(chatid);
      }
  }
});

// const chatmenu_websocket = onSnapshot(doc(db, "menu", currentUserId), (doc) => {
//   // console.log("Current data: ", doc.data());
//   const chat = doc.data();
//   for (let key in chat) {
//     let to_uid = chat[key].ref.split("/")[2];
//     let chatid = [currentUserId, to_uid]
//     // console.log(chatid);
//     // let conversation_Menu = new chart(to_uid,getCuser);
//     let conversation_Menu = new chart(chatid);
//   }
// });
/*Chat Menu end Here */


/**Create a new chat using new button start here*/
//onclick funcion start here
document.getElementById("user-search").addEventListener("click",async (e)=>{
  e.preventDefault()
  let username = document.getElementById("new-user-search-input").value;
  document.getElementById("new-user-search-input").value = "";
  // console.log(username)
  const querySnapshot = await getDocs( query(collection(db, "profile"), where("username", "==", username)));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    let dataob = doc.data();
    newuserfound(doc.id,dataob.imageUrl,dataob.name,dataob.username)
  });
});
//onclick conversation menu user id
// document.querySelectorAll("[data-newconversation]").forEach(a=>{
//   a.addEventListener("click",async(e)=>{
    
//   });
// });
/**Create a new chat using new button end here*/