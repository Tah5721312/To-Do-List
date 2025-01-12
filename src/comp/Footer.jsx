/* eslint-disable no-unused-vars */
import React from "react";
import "./Footer.css";

import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();

  if (i18n.language === "ar") {
    return (
      <div className="myfooter">
        <footer dir="rtl" className="ali   ">
          {/*        */}
          تم التصميم و البرمجة بواسطة محمد عبد الفتاح
          <span className="span">  {" "}  <i className="fa-solid fa-heart-pulse small-heart"></i>{" "}  </span>
        </footer>
      </div>
    );
  }

  if (i18n.language === "en") {
    return (
      <div className="myfooter">
        <footer className="ali   ">
        Designed and developed by Mohamed Abdel Fatah
        <span className="span">  {" "}  <i className="fa-solid fa-heart-pulse small-heart"></i>{" "}  </span>

        </footer>
      </div>
    );
  }

  if (i18n.language === "fr") {
    return (
      <div className="myfooter">
        <footer className="ali   ">
        Conçu et développé par Mohamed Abdel Fatah
        <span className="span">  {" "}  <i className="fa-solid fa-heart-pulse small-heart"></i>{" "}  </span>

        </footer>
      </div>
    );
  }
};

export default Footer;


// /* eslint-disable no-unused-vars */
// // @ts-nocheck
// import React from "react";
// import    './Footer.css';
// import { useTranslation } from "react-i18next";

// const Footer = () => {
//     const { t, i18n } = useTranslation(); //Hook for translation
  
//   return (
// <div className="myfooter">
//       <footer className="ali   ">

//       {i18n.language === "ar" && 
//         <p dir="rtl">تم التصميم و البرمجة بواسطة محمد عبد الفتاح 
//                     <span className="span">  <i className="fa-solid fa-heart-pulse small-heart"></i></span>
//         </p> 
//       } 
//       {i18n.language === "en" && "Designed and developed by Mohamed Abdel Fatah " } 
//       {i18n.language === "fr" && "Conçu et développé par Mohamed Abdel Fatah " } 

//         <span className="span">  <i className="fa-solid fa-heart-pulse small-heart"></i></span>
//       </footer>
// </div>
//   );
// };

// export default Footer;
