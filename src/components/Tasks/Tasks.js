import React from 'react';

import classes from "./Tasks.module.scss";
const Tasks = (props) => {

  

    return(
        <ul className={classes.Tasks}>
            <h2 className={classes.Tasks__Heading}>Tasks</h2>
            { (props.status  && props.lenght) ? <p className={classes.Tasks__SubHeading}>{props.firstName}, you have {props.taskLenght} {props.taskLenght > 1 ? "tasks" : "task"} to accomplish today's Goals!</p> : null}
            
            {props.children}
            
        </ul>
    )
}

export default Tasks;