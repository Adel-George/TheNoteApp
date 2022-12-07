import React from "react";
import Nav from "./comp/Nav";
import Home from "./comp/Home";
import SignIn from "./comp/SignIn";
import Register from "./comp/Register";
import Error from "./comp/Error";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from 'react';


export default function App() {
  const navLin=useNavigate();
const [userAll, setUserAll] = useState();
const [idUser, setIdUser] = useState();
function clearName(){
  navLin("/singIn");
  localStorage.removeItem("userName");
  setUserAll(null);
}
  function dataList(){
    const userList= jwtDecode(localStorage.getItem("userName"));
    setUserAll(userList);
    setIdUser(userList._id);

  }
  function SaveList(e){
    if(localStorage.getItem("userName")){
      return e.children;
    }
    else{
      return <Navigate to="/singIn"/>
    }
  }

  useEffect(() => {
    if(localStorage.getItem("userName")){
      dataList();
    }
  }, []);
  return (
    <>
      <Nav newToking={userAll} deletList={clearName}/>
      <Routes>
        <Route path="/" element={<SaveList><Home newToking={idUser}/></SaveList>} />
        <Route path="home" element={<SaveList><Home newToking={idUser}/></SaveList>} />
        <Route path="singIn" element={<SignIn dataToking={dataList} />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>

    </>
  );
}
