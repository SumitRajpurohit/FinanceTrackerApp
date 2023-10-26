import React, { useState } from 'react'
import "./styles.css"
import Input from '../Input';
import Button from '../Button';
import { GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth, db, provider, setDoc} from "../../firebase"
import { doc } from '../../firebase';
import { toast } from 'react-toastify';
import { getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


function SignupSigninComponents() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [confrimPassword,setConfirmPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [loginForm,setLoginForm] = useState(false);
    const navigate = useNavigate();

    function signupWithEmail(){
      setLoading(true)
      console.log("name",name);
      console.log("email",email);
      console.log("password",password);
      console.log("confirmPassword",confrimPassword);

      // Authenticate the user,or basicslly create a new account using email and pass
      if(name!="" && password!="" && email!="",confrimPassword!=""){
        if(password == confrimPassword){
          createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("user>>>",user);
    toast.success("User Created");
    setLoading(false);
    setName("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
    createDoc(user)
    navigate("/dashboard")

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage)
    setLoading(false)
    // ..
  });
 }else{
  toast.error("Passwords do not match")
  setLoading(false)
  
 }
  
} else{
  toast.error("All fields are mandatory");
  setLoading(false)
}
 }

 async function createDoc(user){
  // make sure that the doc with the uid doesn`t exist .
  // create a doc.
  setLoading(true)
  if(!user) return;
  const userRef = doc(db,"users",user.uid);
  const userData = await getDoc(userRef)
 if(!userData.exists()){
  try{
    await setDoc(doc(db,'users',user.uid),{
      name : user.DisplayName ? user.DisplayName : name,email : user.email,
      photoURL : user.photoURL ? user.photoURL : "",
      createdAt : new Date(),
    })
    toast.success("Doc created!")
    setLoading(false);
   }
   catch(e){
    toast.error(e.message);
    setLoading(false);


   }
 } else {
  toast.error("Doc is already exists")
  setLoading(false);


 }
     

 }
 function loginUsingEmail(){
  console.log("Email",email);
  console.log("Password",password);
  setLoading(true);
  if(email != "" && password!=""){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      toast.success("User Logged In!")
      console.log("user Logged in",user);
      setLoading(false);
      navigate("/dashboard")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
    });
  
  } else {
    toast.error("All fields are mandatory!")
    setLoading(false);
  }
 }
  function googleAuth(){
    setLoading(true);
    try{
      signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log("user>>>",user);
    createDoc(user);
    setLoading(false);
    navigate("/dashboard");
    toast.success("User Authenticated")
  }).catch((error) => {
    // Handle Errors here.
    setLoading(false);
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
  });

  }
    catch(e){
      setLoading(false);
      toast.error(e.message);
     
    } 
  }
  return (
    <>
    {loginForm ? (<div className='signup-wrapper'>
        <h2 className='title'>Login on <span style={{color:"var(--theme)"}}>Financely</span> </h2>
        <form action="">
        
              <Input 
              type="email"
            label={"Email"} 
            state={email} 
            setState={setEmail} 
            placeholder={"JohnDoe@gmail.com"}
            />
              <Input 
              type="password"
            label={"Password"} 
            state={password} 
            setState={setPassword} 
            placeholder={"Example@123"}
            />
            <Button 
            disabled = {loading}
            text={loading ? "loading...": "Signup Using Email and Password"}
             onClick={loginUsingEmail}/>
            <p className='p-login'>Or</p>
            <Button 
            onClick={googleAuth}
            text={loading ? "loading...":"Login Using Google"} blue={true}/>
            <p className="p-login" style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Don`t Have An Account Already? Click here</p>
        </form>
    </div> ) : ( <div className='signup-wrapper'>
        <h2 className='title'>Sign Up on <span style={{color:"var(--theme)"}}>Financely</span> </h2>
        <form action="">
            <Input 
            label={"Full Name"} 
            state={name} 
            setState={setName} 
            placeholder={"John Doe"}
            />
              <Input 
              type="email"
            label={"Email"} 
            state={email} 
            setState={setEmail} 
            placeholder={"JohnDoe@gmail.com"}
            />
              <Input 
              type="password"
            label={"Password"} 
            state={password} 
            setState={setPassword} 
            placeholder={"Example@123"}
            />
            <Input 
            type="password"
            label={"Confrom Password"} 
            state={confrimPassword} 
            setState={setConfirmPassword} 
            placeholder={"Example@123"}

            />
            <Button 
            disabled = {loading}
            text={loading ? "loading...": "Signup Using Email and Password"}
             onClick={signupWithEmail}/>
            <p className='p-login'>Or</p>
            <Button
             onClick={googleAuth}
            text={loading ? "loading...":"Signup Using Google"} blue={true}/>
            <p className='p-login'  style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Have An Account Already? Click here</p>
        </form>
    </div>
   ) }
   
    </>
  )
}

export default SignupSigninComponents;