import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
const Chats = () => {

  const [chats, setChats] = useState({});

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(()=>{
     
    // const getChats = () =>{
    //   const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
    //     const data = doc.data();
    //     console.log("firestoredaat", data);

    //     // setChats(doc.data())
      

    //   if (data) {
    //     setChats(data); 
    //     // Update the chats state with Firestore data
    //     console.log("Users", data);
    //   } else {
    //     console.log("Firestore data is null or undefined.");
    //   }
    // });
    
    //   return () => {
    //     unsub();
    //   };
    // };
  

    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        try {
          if (doc.exists()) {
            const data = doc.data();
            console.log("Firestore data:", data);
            if (data) {
              setChats(data);
              console.log("User:", data);
            } else {
              console.log("Firestore data is null or undefined.");
            }
          } else {
            console.log("Document does not exist.");
          }
        } catch (error) {
          console.error("Firestore error:", error);
        }
      });
    
      return () => {
        unsub();
      };
    };
    
    currentUser.uid && getChats();
  },[currentUser.uid]);
  
  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u })
  }

  return (
    <div className='chats'>
    {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
     
      <div className='userChat' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
    <img src={chat[1].userInfo.photoURL} alt=""/>
    <div className='userChatInfo'>
        <span>{chat[1].userInfo.displayName}</span>
        <p>{chat[1].lastMessage?.text}</p>
    </div>
    </div>
  
    
    )
    )
    }
     
   </div>
  );
}

export default Chats;




// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";

// const Chats = () => {
//   const [chats, setChats] = useState([]);

//   const { currentUser } = useContext(AuthContext);
//   const { dispatch } = useContext(ChatContext);

//   useEffect(() => {
//     const getChats = () => {
//       const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
//         setChats(doc.data());
//       });

//       return () => {
//         unsub();
//       };
//     };

//     currentUser.uid && getChats();
//   }, [currentUser.uid]);

//   console.log(Object.entries(chats));
//   const handleSelect = (u) => {
//     dispatch({ type: "CHANGE_USER", payload: u });
//   };

//   return (
//     <div className="chats">
//       {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
//         <div
//           className="userChat"
//           key={chat[0]}
//           onClick={() => handleSelect(chat[1].userInfo)}
//         >
//           <img src={chat[1].userInfo.photoURL} alt="" />
//           <div className="userChatInfo">
//             <span>{chat[1].userInfo.displayName}</span>
//             <p>{chat[1].userInfo.lastMessage?.text}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Chats;