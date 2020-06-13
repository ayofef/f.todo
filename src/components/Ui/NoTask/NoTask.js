import React from 'react';
import NOTE from "../../../assets/info.svg";

import classes from "./NoTask.module.scss";

const NoTask = () => {

    

    return(
        <div className={classes.NoTask}>
            <img src={NOTE} alt="Notice"/>
            <p>You currently have no task</p>
        </div>
    )
}

export default NoTask;