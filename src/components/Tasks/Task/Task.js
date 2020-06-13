import React, { useState} from 'react';
import classes from "./Task.module.scss";
import { Success } from "./completedSVG";

const Task = (props) => {

    const [SVG, setSVG] = useState(false);
    
    

    return(
        <li className={classes.Task__Lists}>
            {props.children}
                
            <span onClick={props.completed} >
                
            <div onMouseEnter={() => setSVG(!SVG)} onMouseLeave={() => setSVG(!SVG)}>
                    {<Success/>}
            </div>
                
            </span>
        
        </li>
    )
}

export default Task;