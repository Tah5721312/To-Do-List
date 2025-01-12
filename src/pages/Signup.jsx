/* eslint-disable no-unused-vars */
import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/loading";
import Error404 from '../pages/Error404';
// import Erroe404 from '../pages/Erroe404';

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {useState} from 'react';
import {auth} from '../firebase/config';
import { createUserWithEmailAndPassword,updateProfile,sendEmailVerification} from "firebase/auth";
import { Await, useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from 'react';
import { OrbitProgress } from "react-loading-indicators";
import { useTranslation } from "react-i18next";

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [hasError, sethasError] = useState(false);
  const [showLoading, setshowLoading] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [userName, setuserName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const { t, i18n } = useTranslation(); //Hook for translation
  
  // Loading    (done)
  // NOT sign-in  (done)
  // sign-in without Email verification   (done)
  // (sign-in && verified email) => navigate(/)
  useEffect(() => {

    if (user) {
              if (!user.emailVerified) 
                { navigate("/");}
    }
  });

const signUPBTN = async (eo) => {
  
  eo.preventDefault(); /////prevent default refresh for button 
  setshowLoading(true)
await  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
   console.log(user);

   sendEmailVerification(auth.currentUser)
   .then(() => {
    // Email verification sent!
    console.log("Email verification sent!");
  });

    updateProfile(auth.currentUser, {
      displayName: userName
    }).then(() => {

      navigate("/");

    }).catch((error) => {
      
      console.log(error.code);

    });

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(error.code);
    sethasError(true)            
     switch (errorCode) {
      case "auth/invalid-email":
        setfirebaseError("Wrong Email")
        break;
        case "auth/operation-not-allowed":
          setfirebaseError("لا يُمكن انشاء حساب فى الوقت الحالى")
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

  if (loading) {
    return <Loading />;
  }

  
  if (error) {
    return <Error404 />;
    // return <Erroe404 />;
    
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Header />
  
          <main>
            <p>We send you an email to verify your Account</p>
            <button className="delete">Send again</button>
          </main>
          <Footer />
        </div>
      );
    }
  }

  if(!user)
    {
      return (
        <>
          <Helmet>
            <title>{t("signup")}</title>
          </Helmet>
          <Header />
    
          <main>
            <form>
              <p style={{ fontSize: "23px", marginBottom: "22px" }}>{t("Create-account")} <span className="span">🧡</span> </p>
    
              <input onChange={(eo) => {setuserName(eo.target.value)}} required placeholder={t("UserName")} type="text" />
              <input   onChange={(eo) => {setEmail(eo.target.value)}}  required  placeholder={t("Email")}  type="email" />
              <input onChange={(eo) => {setPassword(eo.target.value)}} required placeholder={t("Password")} type="password" />
              
              {/* style={{ width: "250px",height:"40px" }} */}
              <button   onClick={ (eo) => {signUPBTN(eo); }}>
  {showLoading? <OrbitProgress style={{ fontSize: "5px",animation: "none !important"}} variant="spokes" color="#1b269b"  text="" textColor="" /> :t("signup") }      

              </button>
              <p className="account">
              {t("Already hava an account")} <Link to="/signin">{t("signin")}</Link>
              </p>  
              {/* hasError ---> true or false */}
              {hasError && <h6 className="mtt">{firebaseError}</h6>}
    
            </form>
    
    
          </main>
          <Footer />
        </>
      );
  }


};

export default Signup;
