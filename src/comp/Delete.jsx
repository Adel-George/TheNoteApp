import React from 'react'

export default function Delete(props) {
  const {deleList,checkUser,errList}=props;
  return (
    <>
<div className="modal fade"  id="xModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-center">
                      {
                        errList
                        ?
                        <div className="alert alert-danger text-center" role="alert" id="alert">
                        {errList}
                      </div>
                        :""
                      }
        <p>Do you really want to delete ?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger" onClick={deleList}>{checkUser?"Delete":"Waiting..."}</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
