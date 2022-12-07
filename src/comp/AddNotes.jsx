import React from 'react'

export default function AddNotes(props) {
    const{addListNote,setNotes,checkUser,errList}=props;
  return (
    <>
     <div className='text-end py-5 pe-5'id='homeList'>
      <button type="button" className="btn p-2" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-plus pe-2"></i>Add Notes</button>
      </div>
              <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Title</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {
                        errList
                        ?
                        <div className="alert alert-danger text-center" role="alert">
                        {errList}
                      </div>
                        :""
                      }
                            <div className="mb-3">
                            <input type="text" className="form-control py-2" id="recipient-name" placeholder='Title' name='title' onChange={addListNote}/>
                          </div>
                          <div className="mb-3">
                            <textarea className="form-control" id="message-text"rows="7" placeholder='Type your Note' name='desc' onChange={addListNote}></textarea>
                          </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-primary disabled" onClick={setNotes} id="addNote" >{checkUser?"Add":"Waiting..."}</button>
                    </div>
                  </div>
                </div>
              </div>
    </>
  )
}
