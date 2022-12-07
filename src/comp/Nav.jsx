import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav(props) {
  const {newToking,deletList} =props;
  return (
    <nav className="navbar navbar-expand-lg position-absolute top-0 start-0 end-0 ps-5 py-3">
  <div className="container-fluid">
    <i className="fa-regular fa-note-sticky fa-3x pe-2"></i>
    <Link className="navbar-brand fs-1" to="/">Notes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto pe-5 me-5 mb-2 mb-lg-0">
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle fs-4" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {newToking?"Logout":"Sign"}
          </Link>
          <ul className="dropdown-menu drop">
            {newToking
            ?
            <li><span className="dropdown-item text-light" id='del' onClick={deletList}>Logout</span></li>
            :
            <>
            <li><Link className="dropdown-item text-light" to="singIn">SingIn</Link></li>
            <li><Link className="dropdown-item text-light" to="register">Register</Link></li>
            </>}
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
