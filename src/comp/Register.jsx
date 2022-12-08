import React from "react";
import xImg from "../img/registration-form-61.jpg";
import  { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
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
  const testList={
    "first_name":/^[a-zA-Z]{4,}$/,
    "last_name":/^[a-zA-Z]{4,}$/,
    "age":/^(1[5-9]{1}||[2-3]{1}[0-9]{1}||40)$/,
    "email":/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    "password":/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
     };

  function userChange(e){
    const newUser={...userList};
    newUser[e.target.name]=e.target.value;
    setUserList(newUser);
   if(testList[e.target.name].test(newUser[e.target.name])&&e.target.value!==""){
    e.target.classList.replace("is-invalid","is-valid");
   }
   else{
    e.target.classList.add("is-invalid");
   }
  }
 async function subList(e){
    e.preventDefault();
    setCheckList(false);
    const testList= xTest();
    if(testList){
      const {data}= await axios.post("https://route-movies-api.vercel.app/signup",userList);
      if(data.message==="success"){
        navTo("/singIn");
        setCheckList(true);
      }
      else{
        setErrorEmail(data.errors.email.message);
        setCheckList(true);
      }
    }
    else{
      setCheckList(true);
    }
  }

  function xTest(){
    const inputList=document.querySelectorAll("input");
    let x=0;
    let y=true;
    for (const i in testList) {
      if(testList[i].test(userList[i])&&userList[i]!==""){
        inputList[x].classList.replace("is-invalid","is-valid");
      }
      else{
        inputList[x].classList.add("is-invalid");
        y = false;
      }
      x++;
    }
    return y;
   }

  return (
    <>
      <div className="bg-img vh-100">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="bg-light rounded-4 hyWt py-5 shadow container-fluid container-lg position-relative">
            <div className="row">
            <div className="col-lg-10 offset-lg-2 ps-4 text-center">
              <h3 className="fs-1 fw-bolder py-1">Register</h3>
              <form className="w-75 mx-auto py-3 order-last" onSubmit={subList}>
                {errorEmail?<div className="alert alert-danger" role="alert">{errorEmail}</div>:""}
                    <div className="mb-3">
                      <input type="text" className="form-control" id="InputFirstName" placeholder="FirstName" name="first_name" onChange={userChange}/>
                      <div className="invalid-feedback text-start">length must be at least 4 characters </div>
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" id="InputLastName" placeholder="LastName" name="last_name" onChange={userChange}/>
                      <div className="invalid-feedback text-start">length must be at least 4 characters </div>
                    </div>
                    <div className="mb-3">
                      <input type="number" className="form-control" id="InputAge" placeholder="Age" name="age" onChange={userChange}/>
                    </div>
                    <div className="mb-3">
                      <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Email" name="email" onChange={userChange}/>
                      <div className="invalid-feedback text-start">must be a valid email </div>
                    </div>
                    <div className="mb-3">
                      <input type="password" className="form-control" id="InputPassword" placeholder="Password" name="password" onChange={userChange}/>
                      <div className="invalid-feedback text-start">
                        <ul>
                          <li>password must contain at least eight characters</li>
                          <li>at least one number</li>
                          <li>and both lower and uppercase letters</li>
                          <li>and special characters</li>
                        </ul>
                    </div>
                    </div>
                    {checkList?<button type="submit" className="btn btn-primary w-100 py-2 mt-3" id="button">Create Account</button>:<button type="submit" className="btn btn-primary w-100 py-2 mt-3" id="button">Waiting...</button>}
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
  );
}
