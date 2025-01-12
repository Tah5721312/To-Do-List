import Loading from 'comp/loading';
import { db } from '../../firebase/config';
import {   doc } from 'firebase/firestore';
import Error404 from 'pages/Error404';
import React, { useRef } from 'react';
import {  useDocument } from 'react-firebase-hooks/firestore';

const Titlesection = ({user,stringId,titleInput}) => {
    // تحصل على document واحد
    const [value, loading, error] = useDocument(doc(db, user.uid ,stringId));
  
    const inputRef = useRef();
    const handleFocus = () => {
      // @ts-ignore
      inputRef.current.focus(); // Focus the input element
    };

    if (error) {
  return <Error404 />;
  // return <Erroe404 />;
  
}         
if (loading) {
  return <Loading />;
  // return <Atom color="#32cd32" size="medium" text="" textColor="" />
}
 
if(value)
{
  console.log(value.data());
  return (
    
    <section className='title center'>
    <h1>
      <input style={{  textDecoration : value.data().completed ? 'line-through wavy red' : 'none', }}
       ref={inputRef} onChange={async(eo)=> titleInput(eo)}
       defaultValue={value.data().title} className='title-input center' type="text" /> 
      <i onClick={handleFocus} className="fa-solid fa-pen-to-square"></i>
    </h1>
    
    {/* <div><button onClick={async () => {
        await updateDoc(doc(db, user.uid, stringId), {
          title: deleteField()  // Removes  item from the array
        });
      }} className="delete" >Delete Account</button></div> */}

 </section>

  );
}
  
}

export default Titlesection;
