/* eslint-disable no-unused-vars */
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Model from "../../shared/Model";
import Loading from "../../comp/loading";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import  './signin.css';
import {useState} from 'react';
import {auth} from '../../firebase/config';
import {signInWithEmailAndPassword ,getAuth ,sendPasswordResetEmail  } from "firebase/auth";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { OrbitProgress } from "react-loading-indicators";
import { useTranslation } from "react-i18next";


const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [showLoading, setshowLoading] = useState(false);
  const [resetpass, setresetpass] = useState("");
  const { t, i18n } = useTranslation(); //Hook for translation

  const ResendBTN = (eo) => {
    eo.preventDefault();
    console.log(user);  
  
                   sendPasswordResetEmail(auth, resetpass)
                   .then(() => {
                     // Password reset email sent!
                     setshowParagraph(true);
                    console.log("send email");
                   })
                   .catch((error) => {
                     const errorCode = error.code;
                     const errorMessage = error.message;
                     console.log(errorCode);
                    
                   });}
 const signInBTN = async (eo) => {
      eo.preventDefault(); /////prevent default refresh for button 
      setshowLoading(true)
  await    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      navigate("/");
      // ...
     })
     .catch((error) => {
      const errorCode = error.code;
      sethasError(true)            
      switch (errorCode) {
        case "auth/invalid-email":
          setfirebaseError("Wrong Email")
          break;
          case "auth/operation-not-allowed":
            setfirebaseError("لا يُمكن تسجيل الدخول فى الوقت الحالى")
            break;
        case "auth/invalid-login-credentials":
          setfirebaseError("invalid Email OR Password")
          break;
        case "auth/too-many-requests":
          setfirebaseError("Please Try Again Later")
          break;
        default:
          setfirebaseError(errorCode)
          break;
      }
    });   
    setshowLoading(false)
  }

                   
 const [showParagraph, setshowParagraph] = useState(false);
  const [showModel, setshowModel] = useState(false);
  const forgotPassword = () => {  setshowModel(true)  }   /* Appear Model  */              
  const closeModel = () => {  setshowModel(false)  }     /* Disappear Model  */             
  const showSendemaill = () => {  setshowParagraph(false)  }     /* Disappear p  */             

  return (  
    <>
      <Helmet>
        <title>{t("signin")}</title>
      </Helmet>
      <Header />

    <main>
      
      {showModel && <Model closeMdl={() => { closeModel(); showSendemaill(); }}  >

      <input onChange={(eo) => {setresetpass(eo.target.value)}} required placeholder={t("Email")} type="email" />
      <button onClick={ (eo) => { ResendBTN(eo); }}>{t("Resend Password")}</button>
  
      {showParagraph && (<p className="check-email"> Please ChecK Your Email To Resend Your Password </p>)}


     </Model>}

        

        <form>
        <input onChange={(eo) => {setEmail(eo.target.value)}} required placeholder={t("Email")} type="email" />
        <input onChange={(eo) => {setPassword(eo.target.value)}} required placeholder={t("Password")} type="password" />
          <button onClick={(eo) => {  signInBTN(eo)  }}>
            
  {showLoading? (<OrbitProgress style={{ fontSize: "5px",animation: "none !important"}} variant="spokes" color="#1b269b"  text="" textColor="" />) : (t("signin")) }      
            
            </button>
          <p className="account">

          {t("dont-have-account")}  <Link to="/signup">{t("signup")}</Link>
            
          </p>
          <p onClick={() => {  forgotPassword();  } }  className="forgot-pass mt">{t("Forgot-Password")}</p>
          {hasError && <h6 className="mtt">{firebaseError}</h6>}
          
        </form>    
      </main>
      <Footer />
    </>
  );
};

export default Signin;
