import Loading from 'comp/loading';
import { db } from '../../firebase/config';
import {  arrayUnion, doc, updateDoc } from 'firebase/firestore';
import Error404 from 'pages/Error404';
import React, {  useState } from 'react';
import {  useDocument } from 'react-firebase-hooks/firestore';
import Moment from 'react-moment';

const Subtasksection = ({user,stringId,completedCheckbox,trashIcon}) => {

    // تحصل على document واحد
    const [value, loading, error] = useDocument(doc(db, user.uid ,stringId));
  
  const [showAddNewTask, setshowAddNewTask] = useState(false);
  const [AddNewTask, setAddNewTask] = useState("");


  
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
  return (
    <section className='sub-task mtt '>
    <div className='parent-time'>
         <p className='time'>Created <Moment fromNow date={value.data().Id}  /></p>
         <div>    <input onChange={async(eo)=>completedCheckbox(eo)} //update checkbox Complete        
         checked={value.data().completed} id='checkbox' type="checkbox" name="subscription" value="newsletter" />
                  <label htmlFor='checkbox'>Completed</label>
        </div>
      
    </div>
    <ul>

   {value.data().Details.map((item) => {
    return(
    
      <li key={item}  className='card-task flex' ><p>{item}</p><i onClick={() =>trashIcon(item)} className="fa-solid fa-trash"></i>
      </li> // Safely map over details

        )
    })}
     </ul>
    
    {showAddNewTask &&
    (
      <form style={{flexDirection:"row"}} className='add-task flex'>
      <input value={AddNewTask} onChange={(eo) => {setAddNewTask(eo.target.value)}}  className=" center mt"  type="text" /> 
      <button onClick={ async (eo) => {
                            eo.preventDefault();
                            setAddNewTask("");
                            await updateDoc(doc(db, user.uid, stringId), {
                              Details: arrayUnion(AddNewTask)  }); } // add one item to the array
                    
                      }
      className="add-task-btn mt" >Add</button>
      <button onClick={(eo) => {eo.preventDefault();  setshowAddNewTask(false);}} className="add-task-btn mt" >cancle</button>
        </form>
    )}

  <div className="centerblock flex mtt">

      <button onClick={() => {  setshowAddNewTask(true);}} className="add-more-btn ">Add More <i className="fa-solid fa-plus"></i> </button>
    
  </div>
</section>

  );
}
}



export default Subtasksection;
