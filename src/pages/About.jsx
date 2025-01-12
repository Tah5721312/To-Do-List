/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/loading";
import Error404 from '../pages/Error404';
// import Erroe404 from '../pages/Erroe404';

import { Helmet } from "react-helmet-async";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const About = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

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
            <title>About Page</title>
            <meta name="description" content="About" />
          </Helmet>
          <Header />
          <main>
          <p>  Welcome : {user.displayName}<span className="span">🔥</span> <span><i className="fa-solid fa-heart-pulse heart span"></i></span></p>
          </main>
          <Footer />
        </>
      );
    }
  
  }

};

export default About;
