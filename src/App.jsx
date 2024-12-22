import { Route, Routes } from 'react-router'
import Sign_Up from './logindata/Sign_Up'
import Login_page from './logindata/Login_page'
import Navbar1 from './logindata/Navbar1'
import Pro from './jsonFile/Pro'
import Cart_item from './logindata/Cart_item'
import { useState, useEffect } from 'react'
import User from './logindata/User'
import Sidebar from './Selorepage/Sidebar'
import ProductTable from './Selorepage/ProductTable'
import Product_update from './Selorepage/Product_update'
import SeloreUser from './Selorepage/SeloreUser'
import User1 from './Selorepage/User1'
import SeloreSign_Up from './Selorepage/SeloreSign_Up'
import SelorLogin_page from './Selorepage/SelorLogin_page'


const App = () => {
  const [first, setFirst] = useState(0);
  const [second, setsecond] = useState(false)
  // const [Toggle, setToggle] = useState(false);
  // Sidebar
  const [addItem, setAddItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [condition, setCondition] = useState(false);
  const [EditIndex, setEditIndex] = useState([]);

  useEffect(() => {
    const TotalCart = () => {
      const data = JSON.parse(localStorage.getItem("cartItems")) || [];
      const login = JSON.parse(localStorage.getItem("LoggedIn")) || {};
      let totalQuantity = 0;
      let selectdata = data.filter(e => e.email === login.email);
      selectdata.forEach(item => {
        totalQuantity += (item.quantity || 1);

      });
      setFirst(totalQuantity);
    };

    TotalCart();
  }, [second]);

  useEffect(() => {
    const loginInUser = JSON.parse(localStorage.getItem('selore-login')) || {};
    const addItemData = JSON.parse(localStorage.getItem('update-data')) || [];

    const userProducts = addItemData.filter(item => item.email === loginInUser.email);

    setAddItem(userProducts.length);
    // Calculate total price using forEach
    let totalPrice = 0;
    userProducts.forEach((item) => {
      totalPrice += parseFloat(item.price);
    });
    setTotalPrice(totalPrice);
  }, [condition]);
  
  const sellerelogIn = () => {
    return localStorage.getItem("selore-login");
  }

  return (
    <>
      <div className='d-flex Main'>
        {sellerelogIn() && <div >
          <Sidebar setAddItem={setAddItem} setTotalPrice={setTotalPrice} condition={condition} setCondition={setCondition} />
        </div>}
        <div className='w-100'>
          <Navbar1 setFirst={setFirst} first={first} second={second} setsecond={setsecond}  />
          <Routes>
            <Route path="/Pro" element={<Pro second={second} setsecond={setsecond} />} />
            <Route path="/" element={<Pro />} />
            <Route path="/Sign_Up" element={<Sign_Up />} />
            <Route path="/Login_page" element={<Login_page second={second} setsecond={setsecond} />} />
            <Route path="/Cart_item" element={<Cart_item first={first} second={second} setsecond={setsecond} />} />
            <Route path="/User" element={<User />} />
            {/* Selore */}
            <Route path="/ProductTable" element={<ProductTable condition={condition} setCondition={setCondition} setEditIndex={setEditIndex} totalPrice={totalPrice} addItem={addItem} />} />
            <Route path="/Product_update" element={<Product_update condition={condition} setCondition={setCondition} />} />
            <Route path="/SeloreSign_Up" element={<SeloreSign_Up />} />
            <Route path="/SeloreLogin_page" element={<SelorLogin_page condition={condition} setCondition={setCondition} />} />
            <Route path="/User1" element={<User1 />} />
            <Route path="/SeloreUser" element={<SeloreUser />} />
          </Routes>
        </div>
      </div>
    </>
  )
}


export default App;