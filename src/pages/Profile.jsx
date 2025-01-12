/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/loading";
import Error404 from '../pages/Error404';
// import Erroe404 from '../pages/Erroe404';

// import MainContent from "../comp/MainContent";
import { Helmet } from "react-helmet-async";
import { useEffect } from 'react';
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import Moment from 'react-moment';
import { deleteUser } from "firebase/auth";
const Profile = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const DeleteBTN = () => {
                             deleteUser(user).then(() => {
                               // User deleted.
                               console.log("User deleted");
                             }).catch((error) => {
                               // An error ocurred
                               console.log(error.message);
                             });
                           // user.delete();  // Add parentheses to actually call the delete function
                           }


  useEffect(() => {

                    if (!user && !loading)
                             {navigate("/");}
                       
                     if (user) {
                             if (!user.emailVerified) 
                             { navigate("/");}
                           }
                         });
                       // },[user]);
  
if (loading) {
  return <Loading />;
}


  if (error) {
      return <Error404 />;
      // return <Erroe404 />;
      
    }


  if (user) {
    if (user.emailVerified) {
    return (
      <>
        <Helmet>
          <title>Profile Page</title>
  
          <style type="text/css">{` 
        


  
          `}</style>
  
        </Helmet>
  
        <Header />     
        {/* <MainContent pageName="JAVASCRIPT Page" /> */}
        {user && <main >
            <div className="prof">
               Email : {user.email}<br/>
                <div>  Welcome : {user.displayName}<br/></div>    {/* <span>🧡</span> */}
                <div>CreationTime : <Moment format="YYYY/MM/DD">{user.metadata.creationTime}</Moment></div>
                      <Moment fromNow date={user.metadata.creationTime}  />
                      <Moment fromNow date={user.metadata.lastSignInTime} />
                <div>Last sign in : <Moment format="YYYY/MM/DD">{user.metadata.lastSignInTime}</Moment></div><br/>          
            </div>
                    <button className="delete"  onClick={() => {  DeleteBTN();  }}>Delete Account</button>
          </main>}
        <Footer />
      </>
    );
  }
  }

};

export default Profile;
