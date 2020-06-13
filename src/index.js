import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import ReduxThunk from "redux-thunk";
import { reduxFirestore, getFirestore,  createFirestoreInstance, firestoreReducer,  } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase, firebaseReducer, isLoaded,   } from "react-redux-firebase";
import fbConfig from "./config/fbconfig";
import firebase from "firebase/app";

import { LargeLoader } from "./components/Ui/Loader/Loader";
import authReducer from "./store/reducers/authReducer";
import taskReducer from "./store/reducers/taskReducer";



/** REDUX DEV TOOL **/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/** COMBINING REDUCERS */
const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

const store = createStore(rootReducer, composeEnhancers(
      applyMiddleware(ReduxThunk.withExtraArgument({getFirebase, getFirestore})),
      reduxFirestore(fbConfig)
));
const rrfconfig = {
  userProfile: 'users', // where profiles are stored in database,
  useFirestoreForProfile: true
}
const rrfProps = {
  firebase,
  fbconfig: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  config: rrfconfig,
  presence: "presence"
  
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <LargeLoader />;
      return children
}




ReactDOM.render(
  <Provider store={store}> 
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App/>
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
