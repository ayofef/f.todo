import React, { useState, useEffect }  from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import site from "../../assets/metaData.json";
import * as actionCreator from "../../store/actions/taskAction";

import { TaskLoader } from "../../components/Ui/Loader/Loader";
import Input from "../../components/UserInput/UserInput";
import Tasks from "../../components/Tasks/Tasks";
import Task from "../../components/Tasks/Task/Task";
import NoTask from "../../components/Ui/NoTask/NoTask";

const TaskRoute = (props) => {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);

  
  const id = props.auth.uid;
  const todo = props.task;
  const verified = props.verified;

  const requestStatus = props.status[`todos/${id}`]
  

  /** reading the firestore data directly was returning undefined because firestore has not completed it's request after our component mounts */
  useEffect(() => {
    
    
    if(requestStatus && todo.length >= 1 && id === todo[0].id){
      setTask(todo[0].todos)

      // console.log(task)
      // console.log(todo[0].todos)
    }
    

  },[requestStatus, todo, id, task])


  /** ADD TASK AND CLEAR INPUT */
  const addTask = () => {
    props.addTask(input);
    setInput("");
  }

  if(!id && !verified){
    return(
      <Redirect to="/sign-in"/>
    )
  }
  if(id && !verified){
    return(
      <Redirect to="/verify-email"/>
    )
  }

  

  return(
    <>
      <Helmet> 
        <title>{site.siteMetadata.title} Todo App</title>
        <meta name="google-site-verification" content="0j6Ak-DmlE9O9Iq6AsPF3Ydvg4057AYgw7ilMoZV6sM" />
        <meta name="author" content={site.siteMetadata.author} />
        <meta name="description" content={site.siteMetadata.description} />
        <meta name="thumbnail" content={[site.siteMetadata.siteUrl, "/", site.siteMetadata.image].join("")} />
        <meta name="robots" content={site.siteMetadata.robot} />
        <meta name="og:title" content={site.siteMetadata.title} />
        <meta name="og:keywords" content={site.siteMetadata.keywords} />
        <meta name="og:type" content={site.siteMetadata.type} />
        <meta name="og:url" content={site.siteMetadata.siteUrl} />
        <meta name="og:image" content={[site.siteMetadata.siteUrl, "/", site.siteMetadata.image].join("")} />
        <meta name="og:description" content={site.siteMetadata.description} />
      </Helmet>
      <Input 
        change={(event) => setInput(event.target.value)} 
        value={input} 
        counter={input.length} 
        keyPressed={(event) => (input.length > 1) && (event.key === "Enter") ? (event.preventDefault(), addTask()) : null}
        addTask={ () => input.length > 1 ? addTask() : null}
      />
      
      <div className="container">
        <Tasks firstName={props.profile.firstName} taskLenght={task ? task.length : null} status={requestStatus} lenght={task.length}>
          {
            !requestStatus ? <TaskLoader /> :
            task.length >= 1 ? task.map(({todo, id}) => 
              <Task key={id} completed={() => props.deleteTask(id)}>{todo}</Task>
            ) : <NoTask />
          }
        </Tasks>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  // console.log(state)
  const task = state.firestore.ordered.todos
  

  return{
    verified: state.firebase.auth.emailVerified,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    task: task,
    status: state.firestore.status.requested
  }
}

const mapDispatchToProps = dispatch => {

  return{
    
    addTask: (task) => dispatch(actionCreator.addTask(task)),
    deleteTask: (ID) => dispatch(actionCreator.deleteTask(ID))
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(TaskRoute);

/** SYNC COMPONENT WITH FIRESTORE */
export default compose(
  connect(mapStateToProps, mapDispatchToProps),  
  firestoreConnect(( props) => [
    `todos/${props.auth.uid}`
  ])
)(TaskRoute);

