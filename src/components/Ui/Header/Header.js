import React from 'react';
import { NavLink, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from "../../../store/actions/authAction";


import classes from "./Header.module.scss";




const Header = (props) => {

    const history = useHistory();
    const id = props.auth.uid;

    const SIGN_OUT_AND_REDIRECT = () => {
        
        history.push("/")
        props.signOut()
        
    }

    let mainNav;

    if(id){
        mainNav = [
            {name: "Sign Out",  clicked: true}
        ];
    }else{
        mainNav = [ 
            {name: "Sign In", link: "/sign-in"},
            {name: "Sign Up", link: "/sign-up"}
        ];
    }

    
    return (
        <header className={classes.Ftodo}>
            <div className="container">
                <div className={classes.Ftodo__masthead}>
                    <div className={classes.Ftodo__logo}>
                        <Link to="/">F.todo</Link>
                    </div>
                    <nav className={classes.Ftodo__nav}>
                        <ul>
                            {
                                id ? <Link to="/user-profile" style={{textDecoration: "none"}}><li className={classes.Ftodo__nav__initials}> {props.profile.initials} </li></Link> : null
                            }
                            {
                                mainNav && mainNav.map(({name, link, clicked}, id) => {

                                    return(
                                    <li key={id} onClick={() => clicked ? SIGN_OUT_AND_REDIRECT() : null}>{link ? <NavLink to={link || "/"} activeClassName={classes.activeNavLink}>{name}</NavLink> : <i>{name}</i>}</li>
                                    )
                                })
                                
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = state => {
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
const mapDispatchToProps = dispatch => {

    return{
        signOut: () => dispatch(actionCreator.signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);