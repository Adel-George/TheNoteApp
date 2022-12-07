import React from 'react'

export default function UpdateModal(props) {
    const{addListNote,setNotes,checkUser,userValue,errList}=props;
  return (
    <>
          <div className="modal fade" id="exModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
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
                  <input type="text" className="form-control py-2" id="recipient-name" placeholder='Title' name='title' onChange={addListNote} defaultValue={userValue.title} />
                          </div>
                          <div className="mb-3">
                            <textarea className="form-control" id="message-text"rows="7" placeholder='Type your Note' name='desc' onChange={addListNote} defaultValue={userValue.desc} ></textarea>
                          </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-warning" onClick={setNotes} id="addNote" >{checkUser?"Update":"Waiting..."}</button>
                    </div>
        </div>
      </div>
    </div>
    </>
  )
}
