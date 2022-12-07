import React from 'react'
import xImg from "../img/registration-form-6.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';


export default function SignIn(props) {
  const navTo= useNavigate();
  const [checkList, setCheckList] = useState(true);
  const [errorEmail, setErrorEmail] = useState();
  const [userList, setUserList] = useState({
 "first_name":"",
 "last_name":"",
 "age":0,
 "email":"",
 "password":"",
  });
  function userChange(e){
    const newUser={...userList};
    newUser[e.target.name]=e.target.value;
    setUserList(newUser);
  }
 async function subList(e){
    e.preventDefault();
    setCheckList(false);
      const {data}= await axios.post("https://route-egypt-api.herokuapp.com/signin",userList);
      if(data.message==="success"){
        navTo("/home");
        localStorage.setItem("userName",data.token);
        props.dataToking();
        setCheckList(true);
      }
      else{
        setErrorEmail(data.message);
        setCheckList(true);
      }
  }

  useEffect(() => {
    if(localStorage.getItem("userName")){
      navTo("/home");
    }
  }, [navTo]);
  return (
<>
<div className="bg-img vh-100">
  <div className="d-flex justify-content-center align-items-center h-100">
    <div className="bg-light rounded-4 hyWt py-5 shadow container-fluid container-lg position-relative">
      <div className="row">
      <div className="col-lg-10 offset-lg-2 ps-4 text-center">
        <h3 className="fs-1 fw-bolder py-1">Sing in</h3>
        <form className="w-75 mx-auto py-4 order-last" onSubmit={subList}>
          {errorEmail?<div className="alert alert-danger" role="alert">{errorEmail}</div>:""}
              <div className="mb-3">
                <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Email" name="email" onChange={userChange}/>
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" id="InputPassword" placeholder="Password" name="password" onChange={userChange}/>
              </div>
              {checkList?<button type="submit" className="btn btn-primary w-100 py-2 mt-3" id="button">Login</button>:<button type="submit" className="btn btn-primary w-100 py-2 mt-3" id="button">Waiting...</button>}
            </form>
      </div>
      <div className="translate-middle position-absolute top-50 img-size order-first">
          <img src={xImg} alt="registration" className="w-100 rounded-4" />
      </div>
      </div>
    </div>
  </div>
</div>
</>

  )
}
