import React from 'react';
import { Helmet } from 'react-helmet-async';
// اكتب فقط ال finction  ال اسمها closeMdl 

const Model = ({ closeMdl, children,backgroundColor="whitesmoke" }) => {
  return (
    <div className="parent-of-model">
      <Helmet>
        <style type="text/css">{`
          .parent-of-model {
                          position: fixed;
                           top:0;
                           bottom: 0;
                           left: 0;
                           right: 0;
                           background-color: rgba(3, 3, 3, 0.5);
                           display: flex;
                           align-items: center;
                           justify-content: center;
                   }

          .model {
              //  background-color: whitesmoke;
               width: 400px;
               height: 333px;
               border-radius: 15px;
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               position: fixed;
               animation: mymove  0.8s  ;
               overflow-y: auto;
          }
          
          
          @keyframes mymove {
            0%   {  scale: 0; transform: translateY(-100vh);}
        
            100% {  scale: 1; transform: translateY(0);}
          } 

        .close .fa-xmark
              {
                font-size: 30px;
                color: #444;
                position: absolute; 
                top: 10px;
                right: 22px;
              }
        .close .fa-xmark:hover
              {
                color: goldenrod;
                font-size: 35px;
                transform: rotate(90deg);
                transition: 0.3s;
              } 
        `}</style>
      </Helmet>

      <div className="parent-of-model">
        <form style={{backgroundColor:backgroundColor}} className="model">
          <div
            onClick={() => closeMdl()}
            className="close"
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark"></i>
          </div>

          {children}
        </form>
      </div>
    </div>
  );
};

export default Model;
