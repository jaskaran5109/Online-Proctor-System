import React from 'react'
import { useLocation} from "react-router-dom";
import UpdateCodingQuestion from './UpdateCodingQuestion';
import UpdateMultipleQuestion from './UpdateMultipleQuestion';
const UpdateQuestion = () => {
  const location = useLocation();
  const state = location.state;
  return (
    <div>
      {
        state.data.questionType==="coding"?<div style={{paddingTop:'10%'}}>
        <UpdateCodingQuestion id={state.data.id}/>
        </div>:
        <div style={{paddingTop:'10%'}}>
        <UpdateMultipleQuestion id={state.data.id}/>
        </div>
      }


    </div>
  )
}

export default UpdateQuestion