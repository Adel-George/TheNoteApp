import React from 'react'
import axios from 'axios';
import  { useState, useEffect } from 'react';
import AddNotes from './AddNotes';
import NotesTitle from './NotesTitle';
import { useNavigate } from 'react-router-dom';


export default function Home(props) {
  const {newToking}=props;
  const navList=useNavigate();
  const [checkUser, setCheckUser] = useState(true);
  const [userModel, setUserModel] = useState([]);
  const [errList, setErrList] = useState();
  const [adNote, setAdNote] = useState({
          "title":"",
          "desc":"",
          "userID":newToking,
          "token":localStorage.getItem("userName"),
  });
function addListNote(e){
  const listNote={...adNote};
  listNote[e.target.name]=e.target.value;
  setAdNote(listNote);
  xTest(listNote);
}


function xTest(x){
  const add=document.querySelector("#addNote");
    if(x.title!=="" && x.desc!==""){
      add.classList.remove("disabled");
    }
    else{
      add.classList.add("disabled");
    }
 }
  async  function setNotes(){
    setCheckUser(false);
    const showList =document.querySelector(".modal-backdrop");
    const {data}=await axios.post("https://route-movies-api.vercel.app/addNote",adNote);
    if(data.message==="success")
    {
      setCheckUser(true)
      showList.remove();
      navList("/home");
    }
    else{
      setCheckUser(true);
      setErrList(data.message);
      setTimeout(()=>{
        setErrList("");
      },2000);
    }
    }

useEffect(() => {
  async  function getNotes(){
    const {data}=await axios.get("https://route-movies-api.vercel.app/getUserNotes",
    {headers:
      {
      "Token":localStorage.getItem("userName"),
      "userID":newToking,
    }
    });
    setUserModel(data.Notes);
    }
    getNotes();
}, [newToking]);


  return (
    <>
    <div className='vh-100'id='home'>
    <div className='h-100 container py-5'>
      <AddNotes addListNote={addListNote} setNotes={setNotes} checkUser={checkUser} errList={errList}/>
      <div className='row g-4'>
      <NotesTitle userModel={userModel} newToking={newToking}/>
      </div>
      </div>
    </div>
    </>
  )
}


//  wzqwW1@ww.com

 