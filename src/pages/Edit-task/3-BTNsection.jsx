import Loading from 'comp/loading';
import { db } from '../../firebase/config';
import { collection } from 'firebase/firestore';
import Error404 from 'pages/Error404';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

const BTNsection = ({user,stringId,deleteBTN}) => {

    // Read All Data from firebase
      const [value, loading, error] = useCollection(collection(db, user.uid));
      if (error) {
        return <Error404 />;
        // return <Erroe404 />;
        
      }         
    
      if (loading) {
        return <Loading />;
        // return <Atom color="#32cd32" size="medium" text="" textColor="" />
      }

  if (value) {

  return (
    <section className='center mt '>
    
    <div><button onClick={(eo) => { deleteBTN(eo); }} className="delete" >Delete Account</button></div>
      
    
  </section>
        
  );
}

}

export default BTNsection;
