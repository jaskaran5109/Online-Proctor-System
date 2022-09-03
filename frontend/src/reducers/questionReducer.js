import {
  CODING_QUESTION_REQUEST,
  CODING_QUESTION_SUCCESS,
  CODING_QUESTION_FAIL,
  MULTIPLE_QUESTION_REQUEST,
  MULTIPLE_QUESTION_SUCCESS,
  MULTIPLE_QUESTION_FAIL,
  CLEAR_ERRORS,
} from "../constants/questionConstants";


export const questionReducer=(state= {questions:[]},action)=>{
    switch(action.type)
    {
        case CODING_QUESTION_REQUEST:
            case MULTIPLE_QUESTION_REQUEST:
            return {
                ...state,
                loading:true,
            };
        case CODING_QUESTION_SUCCESS:
            case MULTIPLE_QUESTION_SUCCESS:
            return {
                loading:false,
                success:action.payload,
            }
        case CODING_QUESTION_FAIL:
            case MULTIPLE_QUESTION_FAIL:
            return {
                loading:true,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}