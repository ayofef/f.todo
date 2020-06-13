import React from 'react';
import Loader from "react-loader-spinner";

import classes from "./Loader.module.scss";

export const LargeLoader = () => {
    return(
        <div className={classes.Loader}>
            <Loader type="TailSpin" color="#33658a" height={60} width={60} className={classes.Loader__Spinner}/>
        </div>
    )
}


export const TaskLoader = () => {
    return(
        <div className={classes.TaskLoader}>
            <Loader type="TailSpin" color="#33658a" height={60} width={60} className={classes.Loader__Spinner}/>
        </div>
    )
}


export const ButtonLoader = () => {
    return(
        <>
            <Loader type="TailSpin" color="#fff" height={15} width={15} className={classes.Loader__Spinner}/>
        </>
    )
}