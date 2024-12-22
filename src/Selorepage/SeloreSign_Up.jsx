import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';


const SeloreSign_Up = () => {
  const [data1, setData1] = useState({ name: "", email: "", phone: "", password: "", Address:"" });
  const [arr, setArr] = useState([]);

  const nevigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("selore")) || [];
    setArr(storedData);
  }, []);

  let EmailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  let passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  const handleChange = (e) => {
    setData1({ ...data1, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (validateData()) {
      const FindData = arr.find(item =>
        item.email === data1.email
      );
      if (FindData) {
        toast.info("User already exists");
      } else {
        let get = JSON.parse(localStorage.getItem("selore")) || []
        const copy = get.concat(data1)
        localStorage.setItem("selore", JSON.stringify(copy));
        toast.success("Sign Up Successful");
        nevigate("/Login_page")
      }
    }
    setData1({ name: "", email: "", phone: "", password: "" ,Address:""})
  };

  const validateData = () => {
    let valid = true;
    if (data1.name?.length === 0) {
      toast.error("Please enter the name");
      valid = false;
    } else if (data1.name.length < 5) {
      toast.error("Name must be at least 5 characters long");
      valid = false;
    }
    if (data1.email?.length === 0) {
      toast.error("Please enter the email");
      valid = false;
    } else if (!EmailRegex.test(data1.email)) {
      toast.error("Invalid email");
      valid = false;
    }
    if (data1.phone?.length === 0) {
      toast.error("Please enter the phone number");
      valid = false;
    } else if (data1.phone.length < 10) {
      toast.error("Invalid phone number");
      valid = false;
    }

    if (data1.password?.length === 0) {
      toast.error("Please enter the password");
      valid = false;
    } else if (!passwordRegex.test(data1.password)) {
      toast.error("Invalid password");
      valid = false;
    }
    if (!data1.Address.length === 0) {
      toast.error("Please enter the Address");
      valid = false;
    }
    return valid;
  };

  return (
    <>
      <div className='container w-45 rounded mx-auto text-center my-4 loginpage w-75 p-5'>
        <div className='my-3'>
          <h1>Create Selore Account</h1>
        </div>
        <div className='my-3'>
          <label  className='d-flex justify-content-start text-info'>Name</label>
          <input type="text" className='form-control' placeholder='enter name here' name='name' onChange={handleChange} value={data1.name} />
        </div>

        <div className='my-3'>
          <label h className='d-flex justify-content-start text-info'>Email</label>
          <input type="text" className='form-control' placeholder='enter email here' name='email' onChange={handleChange} value={data1.email} />
        </div>

        <div className='my-3'>
          <label  className='d-flex justify-content-start text-info'>Phone Number</label>
          <input type="number" className='form-control' placeholder='enter phone no. here' name='phone' onChange={handleChange} value={data1.phone} />
        </div>

        <div className='my-3'>
          <label  className='d-flex justify-content-start text-info'>Password</label>
          <input type="password" className='form-control' placeholder='enter password here' name="password" onChange={handleChange} value={data1.password} />
        </div>
        <div className='my-3'>
          <label  className='d-flex justify-content-start text-info'>Address</label>
         <textarea className='p-3' name="Address" id="" onChange={handleChange} value={data1.Address} placeholder='Enter Address'>Address</textarea>
        </div>

        <div>
          <button className='btn btn-warning btn-sm' onClick={() => handleClick()}>Sign Up</button>
        </div>
        <Link className="nav-link" to="/SeloreLogin_page">I already have an account </Link>
      </div>
      <ToastContainer />
     
    </>
  );
}

export default SeloreSign_Up;
