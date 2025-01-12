import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Error404 from "pages/Error404";
import Moment from "react-moment";
// import { Atom } from "react-loading-indicators";
import { useTranslation } from "react-i18next";


const AllTasksSection = ({ user }) => {

  const [queryState, setQueryState] = useState(query(collection(db, user.uid),orderBy("Id")));
  // Read All Data Collection from firebase
  // تحصل على documents كل
  const [value, loading, error] = useCollection(queryState );
  const [IsFullOpacity, setIsFullOpacity] = useState(false);
  const [filter, setFilter] = useState("all");

  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();

  // Handle filter changes (All tasks, Completed, Not Completed)
  const handleFilterChange = (e) => {
     
    setIsFullOpacity(false);
    const selectedFilter  = e.target.value;
    setFilter(selectedFilter);
    if (selectedFilter  === "completed") {
      setQueryState (query(collection(db, user.uid), where("completed", "==", true)));
    } 
    else if (selectedFilter  === "notCompleted") {
      setQueryState (query(collection(db, user.uid), where("completed", "==", false)));
    }
    else
    setQueryState(query(collection(db, user.uid)));
  };

    // Handle sorting order (Newest/Oldest)
    const handleSort = (order) => {
      setIsFullOpacity(order === "desc");
      setQueryState(query(collection(db, user.uid), orderBy("Id", order)));
    };

  if (error) {
    return <Error404 />;
    // return <Erroe404 />;
    
  }

  if (loading) {
    return (
      <section className="mttt">
        <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
      </section>
    );
  }

  if (value) {

    // console.log(value.docs.length);
    return (

<div>
   {/* Filter and Sort options */}
     <section style={{  justifyContent: "center"}} className="parent-of-btns flex mtt">
     {/* Conditionally render sort buttons based on filter */}
     {filter === "all" && (
        <>    
            <button style={{opacity :IsFullOpacity ?  "1" : "0.3" }}
               onClick={() => handleSort("desc")} > 
              
                {i18n.language === "fr" && "Le plus récent"}
                {i18n.language === "en" && "Newest first"}
                {i18n.language === "ar" && "الأحدث أولاً"}
              
                </button>
            <button style={{opacity :IsFullOpacity ?   "0.3" : "1"  }}
              onClick={() => handleSort("asc")}  > 
               
               {i18n.language === "en" && "Oldest first"}
                {i18n.language === "ar" && "الأقدم أولاً"}
                {i18n.language === "fr" && "Le plus ancien"}
                
                </button>
        </>
          )}

        {/* Filter dropdown */}
      <select  value={filter} onChange={handleFilterChange}>
            <option value="all">
                   {" "}
                     {i18n.language === "ar" && "جميع المهام"}
                     {i18n.language === "en" && "All Tasks "}
                     {i18n.language === "fr" && "Toutes les tâches"}{" "}
            </option>
            <option value="completed">
            {" "}
              {i18n.language === "ar" && "المهام المكتملة"}
              {i18n.language === "en" && "Completed Tasks"}
              {i18n.language === "fr" && "Tâches terminées"}{" "}
            </option>
            <option value="notCompleted">
            {" "}
              {i18n.language === "en" && "Not Completed Tasks"}
              {i18n.language === "ar" && "المهام غير المكتملة"}
              {i18n.language === "fr" && "Tâches non terminées"}{" "}
            </option>
          </select>

  </section>
  
        <section className="flex all-tasks mt">
  
          
      {value.docs.length === 0 &&  (<h1>{t("Conngratulation! you Completed your tasks")} </h1>)   }
      
      {value.docs.map((item) => {
            return (
              <article key={item.data().Id} dir="auto" className="one-task">
                <Link className="task-link" to={`/edit-task/${item.data().Id}`}>
  
                  <h2> {item.data().title} </h2>
                  <ul>
                    {item.data().Details.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}> {item} </li>;
                      } else {
                        return false
                      }
                    })}
                  </ul>

                  <p className="time">Created : <Moment locale={i18n.language} fromNow date={item.data().Id} /></p>
                </Link>
              </article>
            );
          })}
        </section>
</div>
    );
  }
};

export default AllTasksSection;
