import React from 'react'
import xImg from "../img/image 14.jpg";
import UpdateModal from './UpdateModal';
import  { useState } from 'react';
import axios from 'axios';
import Delete from './Delete';
import { useNavigate } from 'react-router-dom';


export default function NotesTitle(props) {
    const{userModel,newToking}=props;
    const navList=useNavigate();
    const [checkUser, setCheckUser] = useState(true);
    const [errList, setErrList] = useState();
    const [adNote, setAdNote] = useState({
    });
    let x,y,z;
    x=0;
    y=0;
    z=2;
    function idNotes(e){
      const listNote={...e,
         "token":localStorage.getItem("userName"), "userID":newToking };
      setAdNote(listNote);
    }

    function updateListNote(e){
      const listNote={...adNote};
      listNote[e.target.name]=e.target.value;
      setAdNote(listNote);
    }

    async  function uptateNotes(){
      setCheckUser(false);
      const showList =document.querySelector(".modal-backdrop");
      const {data}=await axios.put("https://route-egypt-api.herokuapp.com/updateNote",{
        "title":adNote.title,
        "desc":adNote.desc,
        "NoteID":adNote._id,
        "token":adNote.token
      }
       );
      if(data.message==="updated")
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
      async  function deleteNotes(){
        setCheckUser(false);
        const showList =document.querySelector(".modal-backdrop");
        const {data}=await axios({
          method: 'delete',
          url: 'https://route-egypt-api.herokuapp.com/deleteNote',
          data: {
            "NoteID":adNote._id,
            "token":adNote.token
          }
        });
        if(data.message==="deleted")
        {
          setCheckUser(true);
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
  return (
    <>
    {userModel
              ?
              userModel.map((e,i)=>{
                x++;
                y++;
                if(x>4){
                  x=1;
                }
                if(y>4){
                  x=z;
                  z++;
                  if(z>4){
                    z=1;
                  }
                  y=1;
                }

                return <div className='col-lg-3  d-flex justify-content-center' key={i}>
                <div className='box-size d-flex justify-content-center 'id={"color"+x}>
                  <div className='w-100 text-center py-5'>
                    <div className='text-end pe-4 translate-middle-y'>
                    <i className="fa-solid fa-ellipsis-vertical fa-2x" role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                          <ul className="dropdown-menu clean">
                            <li><button className="dropdown-item text-warning" data-bs-toggle="modal" data-bs-target="#exModal" onClick={()=>idNotes(e)}><i className="fa-solid fa-pen-to-square pe-2"></i>Edit</button></li>
                            <li> <button className="dropdown-item text-danger"data-bs-toggle="modal" data-bs-target="#xModal" onClick={()=>idNotes(e)}><i className="fa-solid fa-trash pe-2"></i>Delete</button></li>
                          </ul>
                    </div>
                  <h3>{e.title}</h3>
                  <p className='w-75 py-3 mx-auto'id='wordWrap'>{e.desc}</p>
                  </div>
                </div>
                </div>
              }
              )
              :<>
                    <div className='img-s mx-auto'>
                    <img src={xImg} alt="img"  className='w-100'/>
                    </div>
              </>
              }
                <UpdateModal  addListNote={updateListNote} setNotes={uptateNotes} checkUser={checkUser} userValue={adNote} errList={errList}/>
                <Delete deleList={deleteNotes} checkUser={checkUser} errList={errList}/>

              </>


  )
}



