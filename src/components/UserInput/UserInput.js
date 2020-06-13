import React from 'react';


import classes from "./UserInput.module.scss";

const Input = (props) => {

    return(
        <div className="container">
            <div className={classes.Input}>
                <h1 className={classes.Input__Heading}>What are your Goals for Today?</h1>
                <div className={classes.Input__Group}>
                    <input type="text" onChange={props.change} value={props.value} onKeyPress={props.keyPressed} className={classes.Input__Group__Text} maxLength="55" placeholder="Max 50 character.."/>
                    <button onClick={props.addTask} className={classes.Input__Group__Button}>Add Task</button>
                </div>
            </div>
        </div>
    )
}

export default Input;