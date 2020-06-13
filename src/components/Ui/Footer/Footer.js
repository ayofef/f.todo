import React from 'react';
import { Link } from "react-router-dom";
import classes from "./Footer.module.scss";
import FDEV from "../../../assets/logo_dark.svg";


const Footer = () => {

    const date = new Date ();
    const year = date.getFullYear();

    return (
        <footer className={classes.Footer}>
            <div className="container">
                <div className={classes.Footer__Logo}>
                    <Link to="/">F.todo</Link>
                </div>
                <div className={classes.Footer__Credits}>
                    <a href="https://farouq.dev" target="_blank" rel="noopener noreferrer"><img src={FDEV} alt="Powered by the movie database"/></a>
                </div>
                <p style={{textAlign: "center"}}> &copy; {year}</p>
            </div>
        </footer>
    )
}

export default Footer;