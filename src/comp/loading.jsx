import Header from "../comp/header";
import Footer from "../comp/Footer";
import  '../comp/Loading.css';
import React from 'react';
import { Atom } from "react-loading-indicators";

const Loading = () => {
  return (
    <div>
        <Header />

        <main>

        <Atom color="#32cd32" size="large" text="Loading " textColor="#1f840d" />          
          {/* <div className="loading"></div> */}

        </main>
        <Footer />
      </div>
  );
}

export default Loading;