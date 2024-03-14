import { app, appName, cid } from "./config.js";
import { getFirestore, doc, getDoc,getDocs, setDoc, addDoc, collection, Timestamp, serverTimestamp, updateDoc, onSnapshot} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getDatabase, set, ref, child, get,update, serverTimestamp as sT } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
const database = getDatabase(app);

const db = getFirestore(app);
// let conversationHead = (conversion_id, name, img, online = false) => {
//     let status = "offline";
//     if (online) status = "online";
//     const conversationTop = document.createElement("div");
//     conversationTop.classList.add("conversation-top");

//     // Create the "back" button
//     const conversationBackButton = document.createElement("button");
//     conversationBackButton.type = "button";
//     conversationBackButton.classList.add("conversation-back");
//     conversationBackButton.innerHTML = '<i class="ri-arrow-left-line"></i>';

//     conversationTop.appendChild(conversationBackButton);

//     // Create the "conversation-user" div
//     const conversationUser = document.createElement("div");
//     conversationUser.classList.add("conversation-user");

//     // Create the user image
//     const conversationUserImage = document.createElement("img");
//     conversationUserImage.classList.add("conversation-user-image");
//     conversationUserImage.src = img;
//     conversationUserImage.alt = `_${name}_image_`;

//     conversationUser.appendChild(conversationUserImage);

//     // Create the user name and status
//     const Simplediv = document.createElement("div");
//     const conversationUserName = document.createElement("div");
//     conversationUserName.classList.add("conversation-user-name");
//     conversationUserName.textContent = name;

//     const conversationUserStatus = document.createElement("div");
//     conversationUserStatus.classList.add("conversation-user-status", status);
//     conversationUserStatus.textContent = status;

//     Simplediv.appendChild(conversationUserName);
//     Simplediv.appendChild(conversationUserStatus);

//     conversationUser.appendChild(Simplediv);

//     conversationTop.appendChild(conversationUser);

//     const phoneButton = document.createElement("button");
//     phoneButton.type = "button";
//     phoneButton.innerHTML = '<i class="ri-phone-fill"></i>';

//     const videoButton = document.createElement("button");
//     videoButton.type = "button";
//     videoButton.innerHTML = '<i class="ri-vidicon-line"></i>';

//     const infoButton = document.createElement("button");
//     infoButton.type = "button";
//     infoButton.innerHTML = '<i class="ri-information-line"></i>';

//     const conversationButtons = document.createElement("div");
//     conversationButtons.classList.add("conversation-buttons")
//     conversationButtons.appendChild(phoneButton);
//     conversationButtons.appendChild(videoButton);
//     conversationButtons.appendChild(infoButton);

//     conversationTop.appendChild(conversationButtons);

//     const conversation_main = document.createElement("div");
//     conversation_main.classList.add("conversation-main");
//     const activeId = document.getElementById(conversion_id);
//     activeId.insertBefore(conversationTop, activeId.childNodes[0]);
//     activeId.appendChild(conversation_main);

// }

// let conversationButtoms = (conversion_id) => {
//     //     html = `
//     // <div class="conversation-form">
//     //     <button type="button" class="conversation-form-button"><i class="ri-emotion-line"></i></button>
//     //     <div class="conversation-form-group">
//     //         <textarea class="conversation-form-input" rows="1" placeholder="Type here..."></textarea>
//     //         <button type="button" class="conversation-form-record"><i class="ri-mic-line"></i></button>
//     //     </div>
//     //     <button type="button" class="conversation-form-button conversation-form-submit"><i class="ri-send-plane-2-line"></i></button>
//     // </div>`;

//     // Create the conversation-form div
//     const conversationForm = document.createElement("div");
//     conversationForm.classList.add("conversation-form");

//     // Create the emotion-button button
//     const emotionButton = document.createElement("button");
//     emotionButton.type = "button";
//     emotionButton.classList.add("conversation-form-button");
//     emotionButton.appendChild(document.createTextNode(""));
//     emotionButton.appendChild(document.createElement("i")).classList.add("ri-emotion-line");

//     // Create the conversation-form-group div
//     const conversationFormGroup = document.createElement("div");
//     conversationFormGroup.classList.add("conversation-form-group");

//     // Create the conversation-form-input textarea
//     const conversationFormInput = document.createElement("textarea");
//     conversationFormInput.classList.add("conversation-form-input");
//     conversationFormInput.rows = 1;
//     conversationFormInput.placeholder = "Type here...";

//     // Create the conversation-form-record button
//     const conversationFormRecord = document.createElement("button");
//     conversationFormRecord.type = "button";
//     conversationFormRecord.classList.add("conversation-form-record");
//     conversationFormRecord.appendChild(document.createElement("i")).classList.add("ri-mic-line");

//     // Append the elements to the conversation-form-group div
//     conversationFormGroup.appendChild(conversationFormInput);
//     conversationFormGroup.appendChild(conversationFormRecord);

//     // Create the conversation-form-submit button
//     const conversationFormSubmit = document.createElement("button");
//     conversationFormSubmit.type = "button";
//     conversationFormSubmit.classList.add("conversation-form-button", "conversation-form-submit");
//     conversationFormSubmit.appendChild(document.createTextNode(""));
//     conversationFormSubmit.appendChild(document.createElement("i")).classList.add("ri-send-plane-2-line");

//     // Append the elements to the conversation-form div
//     conversationForm.appendChild(emotionButton);
//     conversationForm.appendChild(conversationFormGroup);
//     conversationForm.appendChild(conversationFormSubmit);

//     const activeId = document.getElementById(conversion_id);
//     activeId.insertAdjacentElement("beforeend", conversationForm)
// }
// let dividerOfChat = (text) => {
//     const conversion_divider = document.createElement("div");
//     conversion_divider.classList.add("coversation-divider");
//     const spanText = document.createElement("span");
//     spanText.textContent = text;
//     conversion_divider.appendChild(spanText);
//     return conversion_divider;
// }
// let conversation_wrapper_content = (text,time) => {
//     const conversationItemWrapper = document.createElement('div');
//     conversationItemWrapper.classList.add('conversation-item-wrapper');

//     // Conversation item box with flexbox layout
//     const conversationItemBox = document.createElement('div');
//     conversationItemBox.classList.add('conversation-item-box');

//     // Conversation item text with dynamic content
//     const conversationItemText = document.createElement('div');
//     conversationItemText.classList.add('conversation-item-text');

//     const conversationItemTextP = document.createElement('p');
//     conversationItemTextP.textContent = text; // Placeholder, replace with dynamic content

//     const conversationItemTime = document.createElement('div');
//     conversationItemTime.classList.add('conversation-item-time');
//     conversationItemTime.textContent = time; // Placeholder, replace with dynamic time

//     conversationItemText.appendChild(conversationItemTextP);
//     conversationItemText.appendChild(conversationItemTime);

//     // Conversation item dropdown with event listeners
//     const conversationItemDropdown = document.createElement('div');
//     conversationItemDropdown.classList.add('conversation-item-dropdown');

//     const dropdownToggleButton = document.createElement('button');
//     dropdownToggleButton.type = 'button';
//     dropdownToggleButton.classList.add('conversation-item-dropdown-toggle');
//     dropdownToggleButton.innerHTML = '<i class="ri-more-2-line"></i>';

//     const dropdownList = document.createElement('ul');
//     dropdownList.classList.add('conversation-item-dropdown-list');

//     const forwardLi = document.createElement('li');
//     const forwardLink = document.createElement('a');
//     forwardLink.href = '#';
//     // forwardLink.textContent = 'Forward';
//     forwardLink.innerHTML ='<i class="ri-share-forward-line"></i> Forward'; 
//     forwardLi.appendChild(forwardLink);

//     const deleteLi = document.createElement('li');
//     const deleteLink = document.createElement('a');
//     deleteLink.href = '#';
//     // deleteLink.textContent = 'Delete';
//     deleteLink.innerHTML='<i class="ri-delete-bin-line"></i> Delete';
//     deleteLi.appendChild(deleteLink);

//     dropdownList.appendChild(forwardLi);
//     dropdownList.appendChild(deleteLi);

//     conversationItemDropdown.appendChild(dropdownToggleButton);
//     conversationItemDropdown.appendChild(dropdownList);

//     conversationItemBox.appendChild(conversationItemText);
//     conversationItemBox.appendChild(conversationItemDropdown);

//     conversationItemWrapper.appendChild(conversationItemBox);

//     // Append the conversation item where needed
//     // document.querySelector('.conversation-list').appendChild(conversationItemWrapper);
//     return conversationItemWrapper;
// }
// let conversationWrapperA = (img, you = false,) => {
//     let me = "you", imgname = "toImage";
//     if (you) me = "me", imgname = "fromImage";
//     const conversationItem = document.createElement('li');
//     conversationItem.classList.add('conversation-item', me);

//     // Conversation item side
//     const conversationItemSide = document.createElement('div');
//     conversationItemSide.classList.add('conversation-item-side');



//     const conversationItemImage = document.createElement('img');
//     conversationItemImage.classList.add('conversation-item-image');
//     conversationItemImage.src = img;
//     conversationItemImage.alt = `__${imgname}__`;

//     conversationItemSide.appendChild(conversationItemImage);

//     conversationItem.appendChild(conversationItemSide);
//     // Conversation item content
//     const conversationItemContent = document.createElement('div');
//     conversationItemContent.classList.add('conversation-item-content');

//     conversationItemContent.appendChild(conversation_wrapper_content("Hii","12:30"));
//     conversationItemContent.appendChild(conversation_wrapper_content("Hii","12:30"));
//     conversationItemContent.appendChild(conversation_wrapper_content("Hii","12:30"));



//     conversationItem.appendChild(conversationItemContent);

//     // Append the conversation item to a suitable parent element in your HTML
//     // document.querySelector('.conversation-list').appendChild(conversationItem);
//     return conversationItem;

// }
// let conversationMain = (conversion_id) => {
//     // <div class=""></div>
//     const conversationWrapper = document.createElement("ul");
//     conversationWrapper.classList.add("conversation-wrapper");
//     conversationWrapper.appendChild(dividerOfChat("Yesterday"));
//     conversationWrapper.appendChild(conversationWrapperA("./img/user.png",true))
//     const activeId = document.querySelector(`#${conversion_id} .conversation-main`);
//     // console.log(activeId)
//     activeId.appendChild(conversationWrapper);


// }
// const initchat = () => {
//     //init chat Header
//     conversationHead("conversation-1", "Debjyoti", "./img/user.png");
//     conversationButtoms("conversation-1");
//     conversationMain("conversation-1");
// }
// // initchat()
const beautifyDate =(date)=>{
    const aba = new Date(Date.UTC(1970,0,1,0,0,0,date.seconds * 1000 + date.nanoseconds / 1000000));
    // const aba = new Date("22-Jan-2024");
    let time = aba.toLocaleTimeString().split(":");
    let d = aba.toDateString().split(" ");
    let dayIndex = aba.getDay();
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const resultTime = `${time[0]}:${time[1]} ${time[2].split(" ")[1]}`;
    const resultDate = `${d[2]}-${d[1]}-${d[3]}`;
    return {time:resultTime,date:resultDate,day:day[dayIndex],dayIndex:dayIndex};
}
let beautifyObject = (obj) => {
    let resultObj ={},date,from,text,time,arr=[];
    let newobj={};
    var m  = 0;
    // console.log(obj)
    for(let n in obj ){
        let temp = beautifyDate(obj[n].date);
        date = temp.date;
        time = temp.time;
        from = obj[n].from;
        text = obj[n].text;
        // console.log(date)
        if(!newobj.hasOwnProperty(date)) newobj[date] = {};

        if(!newobj[date].hasOwnProperty(m)) newobj[date][m]={};

        if(!newobj[date][m].hasOwnProperty(from))   newobj[date][m][from]={};

        if(!newobj[date][m][from].hasOwnProperty(n))    newobj[date][m][from][n]={text,time};
        try{  
        if(obj[n].from!=obj[(parseInt(n)+1).toString()].from) m++;
        } catch{};
    }
    return newobj;
}
let sendMessage = async (id, from, text, messageId) => {
    const  object = {};
    object[messageId] = { from, text, date: serverTimestamp() };

    try {
        //
        await updateDoc(doc(db, "chat", id), object);
    } catch (e) {
        console.error("Error adding document:", e);
        console.log(e)
    }
}
let getMessage = async (chatid) => {
    const docRef = doc(db, "chat", chatid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return false;
    }

}

let getUserProfile = async (profileid) => {
    const docRef = doc(db, "profile", profileid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return false;
    }


}
//realtime db connection and further
let getUpdateMenu = async (CID) => {
    const dbRef = ref(database);
    let result;
    await get(child(dbRef, `chat/${CID}`)).then((snapshot) => {
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            result = snapshot.val();
        } else {
            result = false;
        }
    }).catch(err => console.log(err));
    // comsole.log(result)
    return  result;
}
let getmid = async (CID) => {
    const dbRef = ref(database);
    let result;
    await get(child(dbRef, `chat/${CID}`)).then((snapshot) => {
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            result = snapshot.val();
        } else {
            result = false;
        }
    }).catch(err => console.log(err));
    return  result;
}
let initUpdateMenu = async(CID, chatid) => {
    const obj = {
        lastMessage: "",
        mid: -1,
        time: sT(),
        [chatid[0]]: {
            lastSeen: null,
            offset: 0
        },
        [chatid[1]]: {
            lastSeen: null,
            offset: 0
        }};
    await set(ref(database, 'chat/' + CID), obj);
}

//send Update
// let setUpdate = async (CID, mid, text, chatid) => {
//     const obj = {
//         lastMessage: text,
//         mid,
//         time: serverTimestamp(),
//         [chatid]: {
//             lastSeen: serverTimestamp(),
//             offset: mid
//         }
       
//     };
//     // console.log(obj)
//     update(ref(database, 'chat/' + CID),obj);
// }
let sendUpdate = async (CID,text,from) => {
    
    
    // // console.log(obj)
    let mid =await get(child(ref(database),`chat/${CID}/mid`)).then(snapshot=>{return snapshot.val();});
    mid++;
    const obj = {
        lastMessage: text,
        mid,
        time: sT(),
        [from]: {
            lastSeen: sT(),
            offset: mid
        }
       
    };
    // console.log(obj)
    await update(ref(database, 'chat/' + CID),obj);
    return mid;
}
// sendUpdate("d1ad5d17425e3354759515f7c22a39f0f","hi","lw0j8NlZDaZvzN0DSa5YW0dEekx2")
// let createChat = async(chatid)=>{
//     const  to =chatid[1], CID = cid(...chatid);
//     //init menu
//     try {
//         // await setDoc(doc(db, "chat", id,), object);
//         await setDoc(doc(db, "profile", chatid[0],"menu",CID),{to});
//     } catch (e) {
//         console.error("Error adding document:", e);
//     }
//     //init menu rdb
//     get(child(ref(database), `chat/${CID}`)).then(async (snapshot) => {
//         if (!snapshot.exists()) {
//            initUpdateMenu(CID,chatid);
//         }
//     }).catch(err => console.log(err));

//     //init send message
//     getDoc(doc(db, "chat", CID)).then((docSnap)=>{
//         if (!docSnap.exists()) {
//             setDoc(doc(db, "chat", CID), {}).catch(e=>console.error(e));
//         } 
//     }).catch(e=>console.log(e));
    
   

    
// }
let getAllChat = async(currentUserId)=>{
    const snapshot = await  get(child(ref(database), `menu/${currentUserId}`));
        if (snapshot.exists()) {
          return snapshot.data();
        }else return false;
}
//OOP
class chat {
    
    constructor(chatid) {
        /*Get current login user from get Auth*/
        
        /* Get unique id from chat id */
        const CID = cid(...chatid);
        /*init the conversation */
        this.init(CID);
        /*init the header & Buttom*/
        this.initTopBottom(chatid,CID);
        /*init the old chat */
        this.initDisplay(CID,chatid);
        // const from = getUser(chatid[1]);
        // console.log(Window.user)
       
        //init chat buttom
        // this.conversationButtoms(c_id);
        // init main body
        // this.conversationMain(c_id);
        
    }
    init(cid) {
        // console.log(cid)
        const conversation = document.createElement("div");
        conversation.classList.add("conversation")
        conversation.id = cid;
        const chat_main = document.getElementById("chat-main");
        chat_main.appendChild(conversation);
    }
    async initTopBottom(chatid,CID){
        let objR;
        await getUserProfile(chatid[1]).then(obj =>{
            // console.log(obj)
            this.conversationHead(CID,obj.name, obj.imageUrl,true);
            this.conversationButtoms(CID,chatid)
            objR = obj;
            getUpdateMenu(CID).then(obj =>{
                // console.log(obj)
                if(obj!=false){
                    // console.log(obj,objR);
                    let offset = parseInt(obj.mid) - parseInt(obj[chatid[0]].offset);
                    let time =  (new Date(obj.time * 1000)).toString().split(" ")[4].split(":").slice(0,2).join(":");
                    // console.log(obj.time)
                    // console.log(time)
                    this.conversationMenu(CID,objR.imageUrl,objR.name,obj.lastMessage,offset,time)
                    
                }else{
                    //if realtime db is not initlialise then init rtdbms
                    initUpdateMenu(CID,chatid);
                }
            });    
        });
        
        
    }
    initDisplay(CID,...others){
        //get mesessage CID
        //const CID = "152672f7682214f6c0aacdf695086594";
        // let objR;
        // getMessage(CID).then(obj=>{
            
        // });
        const unsub = onSnapshot(doc(db, "chat", CID), (doc) => {
            const obj = doc.data();
            const objR = beautifyObject(obj);
            this.conversationMain(CID,objR,...others)
        });
        // getMessage(CID).then(obj=>{
        //     const objR = beautifyObject(obj);
        //     this.conversationMain(CID,objR,...others)
        // });
        

    }
    conversationMenu(CID,img,name,lastMessage,offset,time){
        //li
        const conversationItem = document.createElement('li');
        //a
        const conversationLink = document.createElement('a');
        conversationLink.href = '#';
        conversationLink.dataset.conversation = "#"+CID;
        conversationLink.addEventListener("click",(e)=>{
            e.preventDefault()
            // console.log(conversationLink.dataset.conversation)
            document.querySelectorAll('.conversation').forEach(function(i) {
                i.classList.remove('active')
            })
            document.querySelector(conversationLink.dataset.conversation).classList.add('active')
        });
        //img
        const conversationImage = document.createElement('img');
        conversationImage.classList.add('content-message-image');
        conversationImage.src = img; 
        conversationImage.alt = `__${name}__`;
        //span
        const conversationInfo = document.createElement('span');
        conversationInfo.classList.add('content-message-info');
        //span
        const conversationName = document.createElement('span');
        conversationName.classList.add('content-message-name');
        conversationName.textContent = name; 
        //span
        const conversationText = document.createElement('span');
        conversationText.classList.add('content-message-text');
        conversationText.textContent = lastMessage; 
        //append Name and last message
        conversationInfo.appendChild(conversationName);
        conversationInfo.appendChild(conversationText);
        //span
        const conversationMore = document.createElement('span');
        conversationMore.classList.add('content-message-more');
        //span
        const conversationUnread = document.createElement('span');
        conversationUnread.classList.add('content-message-unread');
        conversationUnread.textContent = offset;
        if(offset==0) conversationUnread.style="display:none";
        //span
        const conversationTime = document.createElement('span');
        conversationTime.classList.add('content-message-time');
        conversationTime.textContent = time;

        conversationMore.appendChild(conversationUnread);
        conversationMore.appendChild(document.createElement("br"));
        conversationMore.appendChild(conversationTime);

        conversationLink.appendChild(conversationImage);
        conversationLink.appendChild(conversationInfo);
        conversationLink.appendChild(conversationMore);

        conversationItem.appendChild(conversationLink);

        // Append the conversation item where needed
        document.querySelector('.content-messages-list').appendChild(conversationItem);

    }
    conversationHead(conversion_id, name, img, online = false) {
        let status = "offline";
        if (online) status = "online";
        const conversationTop = document.createElement("div");
        conversationTop.classList.add("conversation-top");

        // Create the "back" button
        const conversationBackButton = document.createElement("button");
        conversationBackButton.type = "button";
        conversationBackButton.classList.add("conversation-back");
        conversationBackButton.innerHTML = '<i class="ri-arrow-left-line"></i>';
        conversationBackButton.addEventListener('click', function (e) {
            e.preventDefault()
            this.closest('.conversation').classList.remove('active')
            document.querySelector('.conversation-default').classList.add('active')
        })
        conversationTop.appendChild(conversationBackButton);

        // Create the "conversation-user" div
        const conversationUser = document.createElement("div");
        conversationUser.classList.add("conversation-user");

        // Create the user image
        const conversationUserImage = document.createElement("img");
        conversationUserImage.classList.add("conversation-user-image");
        conversationUserImage.src = img;
        conversationUserImage.alt = `_${name}_image_`;
        conversationUserImage.id = `img${conversion_id}`;

        conversationUser.appendChild(conversationUserImage);

        // Create the user name and status
        const Simplediv = document.createElement("div");
        const conversationUserName = document.createElement("div");
        conversationUserName.classList.add("conversation-user-name");
        conversationUserName.textContent = name;

        const conversationUserStatus = document.createElement("div");
        conversationUserStatus.classList.add("conversation-user-status", status);
        conversationUserStatus.textContent = status;

        Simplediv.appendChild(conversationUserName);
        Simplediv.appendChild(conversationUserStatus);

        conversationUser.appendChild(Simplediv);

        conversationTop.appendChild(conversationUser);

        const phoneButton = document.createElement("button");
        phoneButton.type = "button";
        phoneButton.innerHTML = '<i class="ri-phone-fill"></i>';

        const videoButton = document.createElement("button");
        videoButton.type = "button";
        videoButton.innerHTML = '<i class="ri-vidicon-line"></i>';

        const infoButton = document.createElement("button");
        infoButton.type = "button";
        infoButton.innerHTML = '<i class="ri-information-line"></i>';

        const conversationButtons = document.createElement("div");
        conversationButtons.classList.add("conversation-buttons")
        conversationButtons.appendChild(phoneButton);
        conversationButtons.appendChild(videoButton);
        conversationButtons.appendChild(infoButton);

        conversationTop.appendChild(conversationButtons);

        const conversation_main = document.createElement("div");
        conversation_main.classList.add("conversation-main");
        const activeId = document.getElementById(conversion_id);
        activeId.insertBefore(conversationTop, activeId.childNodes[0]);
        activeId.appendChild(conversation_main);

    }
    async conversationButtoms(conversion_id,userid) {
        // Create the conversation-form div
        const conversationForm = document.createElement("div");
        conversationForm.classList.add("conversation-form");

        // Create the emotion-button button
        const emotionButton = document.createElement("button");
        emotionButton.type = "button";
        emotionButton.classList.add("conversation-form-button");
        emotionButton.appendChild(document.createTextNode(""));
        emotionButton.appendChild(document.createElement("i")).classList.add("ri-emotion-line");

        // Create the conversation-form-group div
        const conversationFormGroup = document.createElement("div");
        conversationFormGroup.classList.add("conversation-form-group");

        // Create the conversation-form-input textarea
        const conversationFormInput = document.createElement("textarea");
        conversationFormInput.classList.add("conversation-form-input");
        conversationFormInput.rows = 1;
        conversationFormInput.placeholder = "Type here...";
        // conversationFormInput.id  = `ta${conversion_id}`;

        // Create the conversation-form-record button
        const conversationFormRecord = document.createElement("button");
        conversationFormRecord.type = "button";
        conversationFormRecord.classList.add("conversation-form-record");
        conversationFormRecord.appendChild(document.createElement("i")).classList.add("ri-mic-line");

        // Append the elements to the conversation-form-group div
        conversationFormGroup.appendChild(conversationFormInput);
        conversationFormGroup.appendChild(conversationFormRecord);

        // Create the conversation-form-submit button
        const conversationFormSubmit = document.createElement("button");
        conversationFormSubmit.type = "button";
        conversationFormSubmit.classList.add("conversation-form-button", "conversation-form-submit");
        conversationFormSubmit.appendChild(document.createTextNode(""));
        conversationFormSubmit.appendChild(document.createElement("i")).classList.add("ri-send-plane-2-line");
        let n = 4;
        conversationFormSubmit.addEventListener('click', e => {
            e.preventDefault()
            const text = conversationFormInput.value;
            conversationFormInput.value = "";
            const [from,to] = userid;
            // console.log(to, from)
            sendUpdate(conversion_id,text,from).then(mid=>{
                // console.log(mid)
                sendMessage(conversion_id,from,text,mid);
            });
            

        })

        // Append the elements to the conversation-form div
        conversationForm.appendChild(emotionButton);
        conversationForm.appendChild(conversationFormGroup);
        conversationForm.appendChild(conversationFormSubmit);

        const activeId = document.getElementById(conversion_id);
        activeId.insertAdjacentElement("beforeend", conversationForm)
    }
    divider(text) {
        const conversion_divider = document.createElement("div");
        conversion_divider.classList.add("coversation-divider");
        const spanText = document.createElement("span");
        spanText.textContent = text;
        conversion_divider.appendChild(spanText);
        return conversion_divider;
    }
    conversation_wrapper_content = (text, time) => {
        const conversationItemWrapper = document.createElement('div');
        conversationItemWrapper.classList.add('conversation-item-wrapper');

        // Conversation item box with flexbox layout
        const conversationItemBox = document.createElement('div');
        conversationItemBox.classList.add('conversation-item-box');

        // Conversation item text with dynamic content
        const conversationItemText = document.createElement('div');
        conversationItemText.classList.add('conversation-item-text');

        const conversationItemTextP = document.createElement('p');
        conversationItemTextP.textContent = text; // Placeholder, replace with dynamic content

        const conversationItemTime = document.createElement('div');
        conversationItemTime.classList.add('conversation-item-time');
        conversationItemTime.textContent = time; // Placeholder, replace with dynamic time

        conversationItemText.appendChild(conversationItemTextP);
        conversationItemText.appendChild(conversationItemTime);

        // Conversation item dropdown with event listeners
        const conversationItemDropdown = document.createElement('div');
        conversationItemDropdown.classList.add('conversation-item-dropdown');

        const dropdownToggleButton = document.createElement('button');
        dropdownToggleButton.type = 'button';
        dropdownToggleButton.classList.add('conversation-item-dropdown-toggle');
        dropdownToggleButton.innerHTML = '<i class="ri-more-2-line"></i>';

        const dropdownList = document.createElement('ul');
        dropdownList.classList.add('conversation-item-dropdown-list');

        const forwardLi = document.createElement('li');
        const forwardLink = document.createElement('a');
        forwardLink.href = '#';
        // forwardLink.textContent = 'Forward';
        forwardLink.innerHTML = '<i class="ri-share-forward-line"></i> Forward';
        forwardLi.appendChild(forwardLink);

        const deleteLi = document.createElement('li');
        const deleteLink = document.createElement('a');
        deleteLink.href = '#';
        // deleteLink.textContent = 'Delete';
        deleteLink.innerHTML = '<i class="ri-delete-bin-line"></i> Delete';
        deleteLi.appendChild(deleteLink);

        dropdownList.appendChild(forwardLi);
        dropdownList.appendChild(deleteLi);

        conversationItemDropdown.appendChild(dropdownToggleButton);
        conversationItemDropdown.appendChild(dropdownList);

        conversationItemBox.appendChild(conversationItemText);
        conversationItemBox.appendChild(conversationItemDropdown);

        conversationItemWrapper.appendChild(conversationItemBox);

        // Append the conversation item where needed
        // document.querySelector('.conversation-list').appendChild(conversationItemWrapper);
        return conversationItemWrapper;
    }
    conversationWrapperA = (obj,status,CID) => {
        // console.log(obj)
        // console.log(img)
        let me = "you", imgname = "toImage",imgID="profileImg";
        if (status) me = "me", imgname = "fromImage", imgID=`img${CID}`;
        const img = document.getElementById(imgID);
        let imageUrl = img.src; 
        const conversationItem = document.createElement('li');
        conversationItem.classList.add('conversation-item', me);

        // Conversation item side
        const conversationItemSide = document.createElement('div');
        conversationItemSide.classList.add('conversation-item-side');



        const conversationItemImage = document.createElement('img');
        conversationItemImage.classList.add('conversation-item-image');
        conversationItemImage.src = imageUrl;
        conversationItemImage.alt = `__${imgname}__`;

        conversationItemSide.appendChild(conversationItemImage);

        conversationItem.appendChild(conversationItemSide);
        // Conversation item content
        const conversationItemContent = document.createElement('div');
        conversationItemContent.classList.add('conversation-item-content');

        for(let key in obj){
            // console.log(obj[key])
            conversationItemContent.appendChild(this.conversation_wrapper_content(obj[key].text, obj[key].time),CID);
        }
         
        // conversationItemContent.appendChild(this.conversation_wrapper_content("Hello", "12:30"));



        conversationItem.appendChild(conversationItemContent);

        // Append the conversation item to a suitable parent element in your HTML
        // document.querySelector('.conversation-list').appendChild(conversationItem);
        return conversationItem;

    }
    conversationMain = (conversion_id,object,...others) => {
        // <div class=""></div>
        const conversationWrapper = document.createElement("ul");
        conversationWrapper.classList.add("conversation-wrapper");
        // console.log(others)
        for(let dividerDate in object){
            // console.log(dividerDate)
            conversationWrapper.appendChild(this.divider(dividerDate));
            for(let n in object[dividerDate]){
                for(let uid in object[dividerDate][n]){
                    const obje = object[dividerDate][n][uid];
                   
                    
                    conversationWrapper.appendChild(this.conversationWrapperA(obje,(uid == others[0][1]),conversion_id));

                   
                }
            }
            
        }
        
        
        // conversationWrapper.appendChild(this.conversationWrapperA("./img/user.png", false))
        
        const activeId = document.querySelector(`#${conversion_id} .conversation-main`);
        // console.log(activeId)
        activeId.innerHTML = conversationWrapper.outerHTML;
        activeId.scrollTop = activeId.scrollHeight;
        // activeId.appendChild(conversationWrapper);

        // const ulElement = document.getElementById("yourULElementId");

        // console.log(ulElement.toString()); // This will output: [object HTMLUListElement]
        // console.log(ulElement.innerHTML); // This will output the HTML content inside the <ul> element.
        // console.log(ulElement.outerHTML); // This will output the HTML content of the entire <ul> element, including the <ul> tags themselves.
        // console.log(ulElement.textContent); // This will output the text content of the <ul> element, without any HTML tags.
        
    }

}



const getMenu = async(uid)=>{
    console.log()
    const docRef = doc(db, "menu", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return false;
    }
    
}
//some temp init
// let currentUserId=sessionStorage.getItem('currentUserId');
    // let devjyoti781 = "zxQuBGDcfSM25a9FNuEDrfVII672", rajesh = "lw0j8NlZDaZvzN0DSa5YW0dEekx2";

    // let chatid = [currentUserId, devjyoti781];
//     let chatid1 = [currentUserId,"67C3qm6GLrWzqrN0CWWzXRBG20F3"];
//     getAllChat(currentUserId).then(e=>console.log(e)).catch(err=>console.error(err))
//     // createChat(chatid1)
//     let chatid2 = [ devjyoti781,currentUserId]
    // const conversion_1 = new chat(chatid);
    
    // sendMessage(...chatid,"How may i help you?",4)
// const __chatmain__ = async (user)=>{
    
// }
// export{__chatmain__};
let newuserfound=(uid,img,name,username)=>{
        const a = document.createElement('a');
        a.href = '#';
        a.dataset.newconversation = uid;
        a.addEventListener("click",async(e)=>{
            e.preventDefault();
            const nuid = uid, cuid =  sessionStorage.getItem('currentUserId');
            const CID = cid(nuid,cuid);
            // init chat if not exists documents
            const docRef = doc(db, "chat", CID);
            const docSnap = await getDoc(docRef);
            
            if (!docSnap.exists()) await setDoc(docRef,{});
            try{
                let object1= {},object2 = {};
                object1[CID]={ref:`/profile/${cuid}`};
                object2[CID]={ref:`/profile/${nuid}`};
                await updateDoc(doc(db, "menu", nuid), object1);
                await updateDoc(doc(db, "menu", cuid), object2);
                document.querySelector('a[data-drl="Dchats"]').click();
            }catch(e){
                console.log(e)
            }
        });
      
        const imagenew = document.createElement('img');
        imagenew.className = 'content-message-image';
        imagenew.src = img;
        imagenew.alt = name;
      
        const info = document.createElement('span');
        info.className = 'content-message-info';
      
        const content_message_name = document.createElement('span');
        content_message_name.className = "content-message-name";
        content_message_name.textContent = name;
        info.appendChild(content_message_name);
      
        const textSpan = document.createElement('span');
        textSpan.className = 'content-message-text';
        textSpan.textContent = "@"+username;
        textSpan.style.color = 'green';

        info.appendChild(textSpan);
        a.appendChild(imagenew);
        a.appendChild(info);
      
        document.getElementById("new-user-found").appendChild(a);
}
export {getMenu,chat, newuserfound};