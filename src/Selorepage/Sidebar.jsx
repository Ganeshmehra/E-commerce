import React, { useState } from 'react';
import { FaHome, FaUser, FaUsers, FaHandPointRight, FaWindowClose } from 'react-icons/fa';
import { ImFolderUpload } from 'react-icons/im';
import { Link } from 'react-router-dom';

const Sidebar = ({ setTotalPrice, setaddItem, condition, setCondition }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to toggle sidebar

  const logOut = () => {
    localStorage.removeItem('selore-login');
    navigate('/SeloreLogin_page');
    setaddItem(0);
    setTotalPrice(0);
    setCondition(!condition);
  };

  const seloreLogin = () => {
    return localStorage.getItem('selore-login');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle between expanded and collapsed
  };

  return (
    <>
      <div className={`sidebar d-flex flex-column justify-content-between pb-5 min-vh-100 ${isCollapsed ? 'collapsed' : ''}`}>
        <div>
          <div className="sidebar-header d-flex justify-content-between align-items-center m-1">
            {isCollapsed ? (<>
              <h4 className='fs-5 text-success'>Selore</h4>
              <FaHandPointRight onClick={toggleSidebar} className="toggle-icon text-info fs-4" />
            </>) : (
              <>
              <h4 className='fs-5 text-success'>Selore Data</h4>
                <FaWindowClose onClick={toggleSidebar} className="toggle-icon text-info fs-4" />
              </>
            )}
          </div>
          <ul className="nav flex-column">
            <li className="nav-item box" style={{ padding: '10px 0' }}>
              <Link className="nav-link text-white" to="/ProductTable">
                <FaHome className="me-2 text-white" />
                <span className={`${isCollapsed ? 'd-none' : ''}`}>Product Details</span>
              </Link>
            </li>
            <li className="nav-item box" style={{ padding: '10px 0' }}>
              <Link className="nav-link text-white" to="/Product_update">
                <ImFolderUpload className="me-2 text-white" />
                <span className={`${isCollapsed ? 'd-none' : ''}`}>Add-Product</span>
              </Link>
            </li>
            <li className="nav-item box" style={{ padding: '10px 0' }}>
              <Link className="nav-link text-white" to="/User1">
                <FaUsers className="me-2 text-white" />
                <span className={`${isCollapsed ? 'd-none' : ''}`}>User Details</span>
              </Link>
            </li>
            <li className="nav-item box" style={{ padding: '10px 0' }}>
              <Link className="nav-link text-white" to="/SeloreUser">
                <FaUser className="me-2 text-white" />
                <span className={`${isCollapsed ? 'd-none' : ''}`}>SeloreUser Details</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-item box">
          <Link className="nav-link dropdown-toggle text-white" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <FaUser className="me-2 text-white" />
            <span className={`${isCollapsed ? 'd-none' : ''}`}>Profile</span>
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            {seloreLogin() ? (
              <Link onClick={logOut} className="dropdown-item text-dark" to="/SeloreLogin_page">
                Seller Log out
              </Link>
            ) : (
              <Link to="/SeloreLogin_page" className="dropdown-item text-dark">
                Seller Log in
              </Link>
            )}
            <li>
              <Link className="dropdown-item text-dark" to="/SeloreSign_Up">
                Seller Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
