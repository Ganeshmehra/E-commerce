import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUser, FaCartPlus,FaHome} from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";
import { AiOutlineMenuUnfold } from "react-icons/ai";
const Navbar1 = ({ first, second, setsecond, setFirst}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const totalQuantity = JSON.parse(localStorage.getItem("cartItems"))?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
    setFirst(totalQuantity);
  }, [second]);

  const logOut = () => {
    localStorage.removeItem("LoggedIn")
    navigate("/Login_page");
    setFirst(0);
    setsecond(!second);
  }
 
   const BuyerlogOut= () => {
    localStorage.removeItem("LoggedIn")
    navigate("/SeloreLogin_page");
   }
   const sellerelogOut= () => {
    localStorage.removeItem("selore-login")
    navigate("/Login_page");
   }

  const isLoggedIn = () => {
    return localStorage.getItem("LoggedIn");
  }
  const sellerelogIn = () => {
    return localStorage.getItem("selore-login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 nev  rounded-bottom  top-0">
        <div className="container-fluid">
         {sellerelogIn()?(<span>
          <AiOutlineMenuUnfold onClick={sellerelogOut} style={{cursor:"pointer"}}/>
          </span>):
          (<span className="navbar-brand fs-3 " >
            <MdMenuOpen onClick={BuyerlogOut} style={{cursor:"pointer"}}/>
             </span>)}
            <span className="fw-bolder text-danger" style={{cursor:"pointer"}}>G.K Shooes Shop</span>
          {  isLoggedIn()?(<div className='d-flex'>  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/Pro"><FaHome className="text-dark fs-5"  /></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/Cart_item"><FaCartPlus className='text-dark fs-5' /><span className='text-danger'>{first}</span></Link>
              </li>
            </ul>
          </div>
          <Link className="nav-link" to="/User">
          <FaRegUser />
          </Link></div>):(<div></div>)}
          <div>
            {isLoggedIn() ? (
              <button onClick={logOut} className='btn btn-danger btn-sm'>Buyer Log out</button>
            ) : (
              <Link to="/Login_page" className='btn btn-primary btn-sm'>Buyer Log in</Link>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar1;
