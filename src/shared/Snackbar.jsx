import React from 'react';
import { Helmet } from 'react-helmet-async';

const Snackbar = ({ showMessage }) => {
  return (
    
    <div>      <Helmet>
            <style type="text/css">{`
                     .home .show-message
                             {
                               background-color: rgb(219, 219, 219);
                               font-size: 18px;
                               color: #333;
                             padding: 8px 12px;
                             font-weight: normal;
                             border-radius: 5px;
                             width: 230px;
                             position: fixed;
                             top: 100px;
                             transition: 1s;
                             margin-left: 6px;
                             
                             }
                      .home .fa-circle-check
                             {
                             color:teal;
                             font-size: 20px;
                             margin-left: 6px;
                             position: fixed;
                             margin-top: 4px;
                             
                             
                             } 
            `}</style>
          </Helmet>
        <p style={{
                right : showMessage? " 20px " :"-100vw"
                // right : false? " 20px " :"-100vw"

              }} className="show-message">Task Added Successfully <i className="fa-solid fa-circle-check"></i>
              </p>
    </div>
  );
}

export default Snackbar;
