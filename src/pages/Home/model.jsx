import { useTranslation } from 'react-i18next';
import { OrbitProgress } from 'react-loading-indicators';
import Model from 'shared/Model';

const HomeModel = ({ closeModel,titleInput,detailsInput,AddBTN,submitBTN,taskTitle,subTask,array,
                     showLoading }) => {

const { t } = useTranslation();  //language

        return (
    <Model closeMdl={closeModel } backgroundColor={"whitesmoke"} >

    <div className="model-content">

        {/* <input value={taskTitle} onChange={(eo) => {titleInput(eo);}}  placeholder="Add Title" type="text" /> */}
        <input value={taskTitle} onChange={(eo) => {titleInput(eo);}}  placeholder={t("Add Title")} type="text" />
         <div><input value={subTask} onChange={(eo) => {detailsInput(eo);}} placeholder={t("Details")}type="text" />
                 <button className='ml' onClick={(eo) => { AddBTN(eo) }}>{t("Add")}</button>
        </div>
        {array.length > 0 && (
                                <ul>
                                  {array.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              )}
  <button style={{marginBottom:"33px"}} onClick={(eo) => {submitBTN(eo); }}>
  {showLoading? <OrbitProgress style={{ fontSize: "9px",animation: "none !important"}} variant="spokes" color="#1b269b"  text="" textColor="" /> :t("Submit") }      
      </button>
  </div>
</Model>
  );
}

export default HomeModel;
