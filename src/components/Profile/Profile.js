import React from 'react';
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";
import * as actionCreator from "../../store/actions/authAction";
import * as Yup from 'yup';
import classes from "../Auth/Auth.module.scss";

import { ButtonLoader } from "../Ui/Loader/Loader";
import { errorFormat } from "../Ui/customHooks/errorFormatter";


const profileSchema = Yup.object().shape({
  firstName: Yup.string().required("This field is required").min(2, "Enter a valid first name"),
  lastName: Yup.string().required("This field is required").min(2, "Enter a valid last name")
});
const changePasswordSchema = Yup.object().shape({
  password: Yup.string().required("This field is required").min(8, "Enter at least eight character"),
  passwordConfirm: Yup.string().oneOf([Yup.ref("password")], "Both password need to be the same" )
});


const Profile = (props) => {
  // const [image, setImage] = useState(null);
  // const firebase = useFirebase();
  

  // console.log(firebase)


  // function addTestFile() {
  //   const storageRef = firebase.storage().ref()
  //   const fileRef = storageRef.child("profilePictures/userID")
  //   return fileRef.put(image)
  //     .then(snap => console.log('upload successful', snap))
  //     .catch(err => console.error('error uploading file', err))
  // }
  const {id, verified} = props;
  
  const editProfile = ( values ) => {
    props.editProfile(values)
  } 
  const changePassword = ( values ) => {
    props.changePassword(values)
  } 

  if(id && !verified){
    return(
      <Redirect to="/verify-email"/>
    )
  }
  
  return(
    <div className={classes.BOXBOX}>
        <div className="container">
        <div className={classes.Auth}>
        {/* <h1>Example Upload</h1>
        <label htmlFor="myfile">Select a file:</label>
        <input type="file" id="myfile" name="myfile" onChange={(e) => setImage(e.target.files[0])}/>
        <button onClick={addTestFile}>
            Upload Example File
        </button> */}
        <Formik
          initialValues={{firstName: props.fName || "", lastName: props.lName || ""}}
          validationSchema={profileSchema}
          onSubmit={editProfile}
          enableReinitialize={true}
        >
          {({ isValid, dirty }) => (
          <Form className={classes.Auth__Form}>
              <div className={classes.Auth__Intro}>
                <h2 className={classes.Auth__Intro___Title}>Edit Profile</h2>
              </div>
              <div className={classes.Auth__Form___FormGroup}>
                  <label htmlFor="firstName">First Name</label>
                  <Field name="firstName" autoComplete="on" type="text"/>
                  <ErrorMessage name="firstName" component="div"/>
              </div>
              <div className={classes.Auth__Form___FormGroup}>
                  <label htmlFor="lastName">Last Name</label>
                  <Field name="lastName" autoComplete="on" type="text"/>
                  <ErrorMessage name="lastName" component="div"/>
              </div>
              <button type="submit" disabled={!isValid || !dirty} className={classes.Auth__Form___Button}>
                  {
                      props.eProfile.loading && !props.eProfile.error ? <ButtonLoader /> : "Save Changes"
                  }
              </button>
          </Form>
          )}
        </Formik>
        <div className={classes.Auth__ERROR_RESET}>
            <div className={classes.Auth__Error}>
                { props.eProfile.error ? <p>* {errorFormat( props.eProfile.error.code)}</p> : null}
                {! props.eProfile.loading && ! props.eProfile.error &&  props.eProfile.success ? <p className={classes.Auth__Error__Success}>{ props.eProfile.success}</p> : null}
            </div>
        </div>

        <div className={classes.Auth__Splitter}></div>

        <Formik
          initialValues={{password: "", passwordConfirm: ""}}
          validationSchema={changePasswordSchema}
          onSubmit={changePassword}
          enableReinitialize={true}
        >
          {({ isValid, dirty }) => (
          <Form className={classes.Auth__Form}>
              <div className={classes.Auth__Intro}>
                <h2 className={classes.Auth__Intro___Title}>Change Password</h2>
              </div>
              <div className={classes.Auth__Form___FormGroup}>
                  <label htmlFor="password">New Password</label>
                  <Field name="password" autoComplete="off" type="password"/>
                  <ErrorMessage name="password" component="div"/>
              </div>
              <div className={classes.Auth__Form___FormGroup}>
                  <label htmlFor="passwordConfirm">Confirm New Password</label>
                  <Field name="passwordConfirm" autoComplete="off" type="password"/>
                  <ErrorMessage name="passwordConfirm" component="div"/>
              </div>
              <button type="submit" disabled={!isValid || !dirty} className={classes.Auth__Form___Button}>
                  {
                      props.cPassword.loading && !props.cPassword.error ? <ButtonLoader /> : "Change Password"
                  }
              </button>
          </Form>
          )}
        </Formik>
        <div className={classes.Auth__ERROR_RESET}>
            <div className={classes.Auth__Error}>
                { props.cPassword.error ? <p>* {errorFormat( props.cPassword.error.code)}</p> : null}
                {! props.cPassword.loading && ! props.cPassword.error &&  props.cPassword.success ? <p className={classes.Auth__Error__Success}>{ props.cPassword.success}</p> : null}
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}


const mapStateToProps = state => {

  const profile = state.firebase.profile;

  return{
    id: state.firebase.auth.uid,
    fName: profile.firstName,
    lName: profile.lastName,
    auth: state.firebase,
    cPassword: state.auth.changePassword, 
    eProfile: state.auth.editProfile,
    verified: state.firebase.auth.emailVerified,
  }
}

const mapDispatchToProps = dispatch => {

  return{
    changePassword: (newPassword) => dispatch(actionCreator.changePassword(newPassword)),
    editProfile: (newCredential) => dispatch(actionCreator.editProfile(newCredential))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

