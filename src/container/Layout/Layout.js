import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Task from "../Task/Task";
import Header from "../../components/Ui/Header/Header";
import Footer from "../../components/Ui/Footer/Footer";
import SignUp from "../../components/Auth/SignUp/SignUp";
import SignIn from "../../components/Auth/SignIn/SignIn";
import Profile from "../../components/Profile/Profile";
import Verify from "../../components/Auth/ConfirmEmail/ConfirmEmail";

import classes from "./Layout.module.scss";
import ResetPassword from '../../components/Auth/ResetPassword/ResetPassword';


const Layout = (props) => {

    return(
        <div className={classes.LayoutBox}>
            <Header />
            
            <main style={{paddingTop: "10rem"}}>
                <Switch>
                    <Route path="/" exact component={Task} />
                    <Route path="/sign-up" exact component={SignUp} />
                    <Route path="/sign-in" exact component={SignIn} />
                    <Route path="/reset-password" exact component={ResetPassword} />
                    <Route path="/user-profile" exact component={Profile} />
                    <Route path="/verify-email" exact component={Verify} />
                </Switch>
            </main>

            <Footer />
        </div>
    )
}

export default Layout;