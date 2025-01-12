import { Helmet } from 'react-helmet-async';
import  './Edit-task.css';
// import  '../signin.css';

// import React, { useState } from 'react';
import Header from 'comp/header';
import Footer from 'comp/Footer';
// import Model from 'shared/Model';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/config';
import Error404 from 'pages/Error404';
import { Link, useNavigate,  useParams } from 'react-router-dom';
import Loading from 'comp/loading';
import Titlesection from './1-Titlesection';
import Subtasksection from './2-Subtasksection';
import BTNsection from './3-BTNsection';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const EditTask = (closeModel) => {
  //Page Protected 
  const [user, loading, error] = useAuthState(auth);

  const [showData, setshowData] = useState(false);
 
  let { stringId } = useParams();  // Retrieve the dynamic parameter
console.log(stringId);
/*===========
title section
=============*/
const titleInput  = async (eo) => {    //update title 
  await updateDoc(doc(db, user.uid, stringId), {
   title : eo.target.value });
}

 /* ============
  2- Sub-Task Section
 ==============*/
  const completedCheckbox =  async(eo) => {  //update checkbox Complete
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: true
      });
      
    } else {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: false
      });
    }
  };

  

  const trashIcon = async (item) => {

    await updateDoc(doc(db, user.uid, stringId), {
      Details: arrayRemove(item)  // Removes  item from the array
    });
  };


/*===========
BTNs Section
=============*/


const navigate = useNavigate();

const deleteBTN = async (eo) => {
  eo.preventDefault();
  setshowData(true);
  await deleteDoc(doc(db, user.uid, stringId));
  navigate("/" ,{replace :true}); //عشان بعد الحذف مايعملش رجوع للينك تانى 
};





  // const [showModel, setshowModel] = useState(false);
  // const [showForm, setshowForm] = useState("");
  // const forgotPassword = () => {  setshowForm("show-forgot-password")  } 
  
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
        <title>Task Page</title>
      </Helmet>
      <Header />        
     <main>
             <h1 style={{ fontSize: "28px" }}>
            {" "}
            <span>Welcome to React 🔥🔥🔥</span>{" "}
          </h1>
               <p className="pls">
               Please{" "}
               <Link style={{ fontSize: "30px" }} to="/signin">
                 sign in
               </Link>{" "}
                to continue... 🔥
                 </p>
      </main>
         
      <Footer />
    </>

    )}

if (user)
  {

      // Pass the completed status from Firestore to Titlesection
      // const completed = value ? value.data().completed : false;

  return (
    <div>
        <Helmet>
              <title>EditTask</title>
        </Helmet>      
        <Header />

      {/* {showModel && <Model closeMdl={closeModel} >

       <h3>fgfghfcsfgd</h3>
      </Model>
      } */}

        
{showData? 

(<Loading />)

:

(  <div className='edit-task'>
        
        {/* title */}

        <Titlesection user={user} stringId={stringId} titleInput={titleInput}  />

        {/* sub task section */}

       <Subtasksection user={user} stringId={stringId} completedCheckbox={completedCheckbox} trashIcon={trashIcon} />

        {/* buttons */}

       <BTNsection user={user} stringId={stringId} deleteBTN={deleteBTN}    />
      
        </div>)}
      



        <Footer />

    </div>
  );
}

}

export default EditTask;

