/* eslint-disable no-unused-vars */
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/loading";
import Error404 from '../Error404';
// import Erroe404 from '../pages/Erroe404';

import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword,updateProfile,sendEmailVerification} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { useState } from "react";
// import ReactLoading from 'react-loading';
// import { Atom } from "react-loading-indicators";
import  './Home.css';
import { doc, setDoc } from "firebase/firestore"; 
import HomeModel from "./model";
import AllTasksSection from "./AllTasksSection";
import { useTranslation } from "react-i18next";
import Snackbar from "../../shared/Snackbar";

const Home = () => {
//Page Protected 
  const [user, loading, error] = useAuthState(auth);
  const { t, i18n } = useTranslation();  //language
  const sendAgain = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
     // Email verification sent!
     console.log("Email verification sent!"); });}

  //==============
//  Function of Model
  //==============
  
  const [showModel, setshowModel] = useState(false); /* Appear Model in true value in btn  */
  const closeModel = () => {  setshowModel(false);setsubTask("");settaskTitle("");setarray([]);} /* Disappear Model  */ 
  const [subTask, setsubTask] = useState("");
  const [taskTitle, settaskTitle] = useState("");
  const [array, setarray] = useState([]);
  const [showLoading, setshowLoading] = useState(false);
  const [showMessage, setshowMessage] = useState(false);
  const titleInput = (eo) => {  settaskTitle(eo.target.value) }
  const detailsInput = (eo) => { setsubTask(eo.target.value) }
  
  const AddBTN = (eo) => {
    eo.preventDefault();

    if (!array.includes(subTask) && subTask!=="" )
    {array.push(subTask);}
    
    setsubTask("");

  };
  // Send Data to firebase
  const submitBTN = async (eo) => {
                       eo.preventDefault();
                       const taskId=new Date().getTime() ;
                       console.log("waiting");
                       setshowLoading(true);
                           await setDoc(doc(db,  user.uid  , `${taskId}` ), {
                             title: taskTitle,
                             Details: array,
                             Id:taskId,
                             completed:false
                           }); 
                         console.log("done");                   
                        setsubTask("");
                        settaskTitle("");
                        setarray([]);
                        setshowLoading(false);
                        closeModel();
                        setshowMessage(true);
                        setTimeout(() => {setshowMessage(false);},3000);
                             };  

         console.log(user);

   if (error) {
    return <Error404 />;
    // return <Erroe404 />;
    
  }         

  if (loading) {
    return <Loading />;
    // return <Atom color="#32cd32" size="medium" text="" textColor="" />
  }

  if (!user) {
    return (
      <>
      <Helmet>
        <title>HOME Page</title>
      </Helmet>
      <Header />        
     <main>
             <h1 style={{ fontSize: "28px" }}>

             {i18n.language === "en" && (
              <span>Welcome to React 🔥🔥🔥</span>                  )}
              
              {i18n.language === "ar" && (
              <span> 🔥🔥  اهلا بك فى كورس ريأكت </span>     )}
              {i18n.language === "fr" && (
                 <span>Bienvenue de React 🔥🔥</span>     )}

          </h1>
          {i18n.language === "en" && (
            
            <p className="pls">
              Please{" "}
              <Link style={{ fontSize: "30px" }} to="/signin">
                sign in
              </Link>{" "}
              to continue...{" "}
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
            </p>
          )}

{i18n.language === "ar" && (
            <p dir="rtl" className="pls mt">
              من فضلك قم ب
              <Link style={{ fontSize: "30px" }} to="/signin">
                {" "}
                تسجيل الدخول{" "}
              </Link>{" "}
              للإستمرار{" "}
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
            </p>
          )}

          {i18n.language === "fr" && (
            <p className="pls mt">
              Veuillez
              <Link style={{ fontSize: "30px" }} to="/signin">
                {" "}
                 vous connecter {" "}
              </Link>{" "}
              pour continuer{" "}
              <span>
                <i className="fa-solid fa-heart"></i>
              </span>
            </p>
          )}
      
      </main>
         
      <Footer />
    </>

    )}

  if (user) {

      if (!user.emailVerified) {
        return (
    
          <>
            <Helmet>
              <title>HOME Page</title>
              <meta name="description" content="HOMEEEEEEEEEEEE" />
            </Helmet>      
            <Header />
             <main>
             <p>  {t("Welcome")} : {user.displayName} <span><i className="fa-solid fa-heart-pulse"></i></span></p>
             <p>{t("Please verify your email to continue")} ✋ </p>
            <button onClick={ () => { sendAgain();}} className="delete" 
                >{t("Send email")}</button>
             </main>

        <Footer />
          </>
        );
      }

      if (user.emailVerified) {
        return (
    
          <>
            <Helmet>
              <title>HOME Page</title>
            </Helmet>      
            <Header />
             <main className="home">
          

              {/* show tasks */}
          
         <AllTasksSection user={user} />

              {/* btn add tasks */}
              <section className="mt">
                
                <button onClick={() => {  setshowModel(true);  } } dir="auto"  className="add-task-btn">
                {i18n.language === "en" && "Add new task"}
                {i18n.language === "ar" && "أضف مهمة جديدة"}
                {i18n.language === "fr" && "Ajouter une nouvelle tâche"} 
                  <i className="fa-solid fa-square-plus pad5px"></i> </button>
              
              {showModel && 
                <HomeModel closeModel={closeModel} titleInput={titleInput}
                     detailsInput={detailsInput} AddBTN={AddBTN}
                     submitBTN={submitBTN} taskTitle={taskTitle} subTask={subTask}
                     array={array} showLoading={showLoading} />
              }

              </section>

            <Snackbar showMessage={showMessage} />


           </main>
         
        <Footer />
          </>
        );
      }

  }


};

export default Home;
