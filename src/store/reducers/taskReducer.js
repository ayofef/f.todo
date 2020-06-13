import * as actionType from "../actions/actionType";

const initialState = {
    authError: null
};




const projectReducer = (state = initialState, action ) => {

    switch (action.type) {
        case actionType.ADD_TASK:
            // console.log(action.type);
            return{
                ...state,
                authError: null
                
            }
        case "ADD_TASK_ERROR":
            return console.log("ERROR", action.err)
        case actionType.DELETE_TASK:
            console.log(action.type);
            return{
                ...state,
                authError: null
                
            }
        case "DELETE_TASK_ERROR":
            return console.log("ERROR", action.err)
        default:
            return state;
    }
    


}

export default projectReducer;