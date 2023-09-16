import React, {useState} from 'react';
import Img from '../img/img6.jpg';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage} from "../firebase";
import {  ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';



const Register = () => {

    const [err,setErr] = useState(false);
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
       
        const displayName= e.target[0].value;
        const email= e.target[1].value;
        const password= e.target[2].value;
        const file= e.target[3].files[0];
    

try{
const res = await createUserWithEmailAndPassword(auth, email, password);
const date = new Date().getTime();
const storageRef = ref(storage, `${displayName + date}`);
// const uploadTask = uploadBytesResumable(storageRef, file);
   

  await uploadBytesResumable(storageRef, file).then(() =>{
    getDownloadURL(storageRef).then(async(downloadURL) =>{
      try{

        await updateProfile(res.user, {
          displayName,
          photoURL:downloadURL,
        });

        await setDoc(doc(db, "users", res.user.uid), {
          uid:res.user.uid,
          displayName,
          email, 
          photoURL: downloadURL
        

      }


    );

    await setDoc(doc(db, "userChats", res.user.uid), {});
    navigate("/");
  }
  catch(err){
    console.log(error);
    setErr(true);
    setLoading(false);
  }
    
     
     
    });
    }); 

}catch(err){
   setErr(true);
   setLoading(false);
}
 
} ;
  return (
    <div className='formContainer'>
    <div className='formWrapper'>
        <span className='logo'>Connect</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
            <input type= "text" placeholder="display name"/>
            <input type="email" placeholder="email"/>
            <input type= "password" placeholder="password"/>
            <input style={{display:"none"}} type="file" id="file"/>
            <label htmlFor="file"><img height={25} width={25} src={Img} alt=""/><span>Add an image</span></label>
            <button disabled={loading}>Sign up</button>
            {loading && "Uploading and compressing the image please wait..."}
            {err && <span>Somethng went wrong</span>}
            
            
        </form>
        <p>Do you have an account? <Link to="/login">Login</Link></p>
    </div>
    </div>

  );
};

export default Register;