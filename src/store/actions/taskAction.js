import * as actionType from "./actionType";
import uniqid from "uniqid";



export const ADD_TASK = () => {

    return{
        type: actionType.ADD_TASK
    }
}

export const addTask = task => {

    return (dispatch, getState, {getFirebase, getFirestore}) => {
        
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;
        
        
        const todoIndatabase = getState().firestore.data.todos[authId];
        const newTodo = {
            id: uniqid(),
            todo: task
        }

        //check if user already has a todo directory in database, if not create one (.set) 
        if(!todoIndatabase){
            firestore.collection("todos").doc(authId).set({
                todos: [newTodo],
            }).then(() => {
                dispatch(ADD_TASK())
            }).catch((err) => {
                dispatch({type: "ADD_TASK_ERROR", err})
            })
        }
        else(
            firestore.collection("todos").doc(authId).update({
                todos: [...todoIndatabase.todos, newTodo],
            }).then(() => {
                dispatch(ADD_TASK())
            }).catch((err) => {
                dispatch({type: "ADD_TASK_ERROR", err})
            })
        )
        

    }
};


export const DELETE_TASK = () => {

    return{
        type: actionType.DELETE_TASK
    }
}

export const deleteTask = elementID => {

    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to db
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;
        
        
        const todos = getState().firestore.ordered.todos[0].todos;
        const updatedTodo = todos.filter( el => el.id !== elementID)
    
        
        firestore.collection("todos").doc(authId).update({
            todos: updatedTodo,
        }).then(() => {
            dispatch(DELETE_TASK())
        }).catch((err) => {
            dispatch({type: "DELETE_TASK_ERROR", err})
        })
        
        

    }
};
