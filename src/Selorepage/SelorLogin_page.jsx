import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SelorLogin_page = ({condition, setCondition}) => {
  const [data2, setData2] = useState({ name: "", email: "" });

  let EmailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  let passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  const navigate = useNavigate();


  const handleChange = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (validateData()) {
      const storedData = JSON.parse(localStorage.getItem("selore")) || [];
      const findData = storedData.find(item =>
        item.email === data2.email &&
        item.password === data2.password
      );
      if (findData) {
        toast.success("Log in Success");
        navigate("/Product_update");

        localStorage.setItem("selore-login", JSON.stringify(findData));
        setData2({ name: "", email: ""})
        setCondition(!condition) 
        localStorage.removeItem("LoggedIn")

      }
      else {
        toast.error("Please sign up");
      }
    }
  };

  const validateData = () => {
    let valid = true;
    if (data2.email.length === 0) {
      toast.error("Please enter the email");
      valid = false;
    } else if (!EmailRegex.test(data2.email)) {
      toast.error("Invalid email");
      valid = false;
    }

    if (data2.password.length === 0) {
      toast.error("Please enter the password");
      valid = false;
    } else if (!passwordRegex.test(data2.password)) {
      toast.error("Invalid password");
      valid = false;
    }
    return valid;
  };

  return (
    <>
      <div className=' rounded mx-auto text-center m-4 d-flex justify-content-center align-items-center flex-column loginpage w-25'>
        <div className='my-3'>
          <h1>Selore Log in account</h1>
        </div>
        <div className='my-3'>
          <label htmlFor="email" className='d-flex justify-content-start text-info'>Email</label>
          <input type="text" className='form-control' placeholder='enter email here' name='email' onChange={handleChange}  />
        </div>
        <div className='my-3'>
          <label htmlFor="password" className='d-flex justify-content-start text-info'>Password</label>
          <input type="password" className='form-control' placeholder='enter password here' name="password" onChange={handleChange}  />
        </div>
        <div>
          <button className='btn btn-warning btn-sm' onClick={handleClick}>Log in</button>
        </div>
        <Link className="nav-link" to="/SeloreSign_Up">Create a new account</Link>
      </div>
      <ToastContainer />
    </>
  );
}

export default SelorLogin_page;
