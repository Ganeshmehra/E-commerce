import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Product_update({ condition, setCondition }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [data1, setData1] = useState({ images: "", title: "", description: "", price: "", category: "" });
  const [arrdata, setArrdata] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("update-data")) || [];
    setArrdata(storedData);
    if (location.state?.product) {
      setData1(location.state.product);
      setEditIndex(location.state.index);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setData1({ ...data1, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (validateData()) {
      let update = JSON.parse(localStorage.getItem("update-data")) || []; 
      if (editIndex !== null) {
        update[editIndex] = { ...data1, email: getEmailFromLocalStorage() };
        toast.success("Product edited successfully!");
      } else {
        update.push({ ...data1, email: getEmailFromLocalStorage() });
        toast.success("Product added successfully!");
      }
      localStorage.setItem("update-data", JSON.stringify(update));
      setCondition(!condition);
      navigate('/ProductTable');
    }
    setData1({ images: "", title: "", description: "", price: "", category: "" });
  };

  const validateData = () => {
    let valid = true;

    if (data1.images?.length === 0) {
      toast.error("Please enter the image URL");
      valid = false;
    } else if (data1.images.length < 8) {
      toast.error("Image URL should be at least 8 characters long");
      valid = false;
    }

    if (data1.title?.length === 0) {
      toast.error("Please enter the title");
      valid = false;
    }

    if (data1.description?.length === 0) {
      toast.error("Please enter the description");
      valid = false;
    }

    if (data1.price?.length === 0) {
      toast.error("Please enter the price");
      valid = false;
    }

    if (data1.category?.length === 0) {
      toast.error("Please enter the category");
      valid = false;
    }

    return valid;
  };

  const getEmailFromLocalStorage = () => {
    const email1 = JSON.parse(localStorage.getItem("selore-login")) || {};
    return email1.email;
  };

  return (
    <>
      <div className='mx-5'><h1>{editIndex !== null ? "Edit Product" : "Add Product"}</h1></div>
      <div className='mx-5'>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput" placeholder="Image URL" name='images' onChange={handleChange} value={data1.images} />
          <label htmlFor="floatingInput">Image Address</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingtitle" placeholder="Title" name='title' onChange={handleChange} value={data1.title} />
          <label htmlFor="floatingtitle">Title</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingdescription" placeholder="Description" name='description' onChange={handleChange} value={data1.description} />
          <label htmlFor="floatingdescription">Description</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingprice" placeholder="Price" name='price' onChange={handleChange} value={data1.price} />
          <label htmlFor="floatingprice">Price</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingcategory" placeholder="Category" name='category' onChange={handleChange} value={data1.category} />
          <label htmlFor="floatingcategory">Category</label>
        </div>
        <button className="btn btn-primary" onClick={handleClick}>{editIndex !== null ? "Update Product" : "Add Product"}</button>
      </div>
      <ToastContainer />
    </>
  );
}

export default Product_update;
