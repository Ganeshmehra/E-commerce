import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ProductTable = ({ condition, setCondition, addItem, totalPrice }) => {
  const [updateData, setUpdateData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('update-data')) || [];
    const login = JSON.parse(localStorage.getItem("selore-login")) || {};
    let selectData = storedData.filter(item => item.email === login.email);
    setUpdateData(selectData);
  }, [condition]);

  const handleDelete = (index) => {
    const storedData = JSON.parse(localStorage.getItem('update-data')) || [];
    const login = JSON.parse(localStorage.getItem("selore-login")) || {};
    let selectData = storedData.filter(item => item.email === login.email);

    const newData = [...selectData];
    newData.splice(index, 1);

    const updatedStoredData = storedData.filter(item => item.email !== login.email).concat(newData);
    localStorage.setItem('update-data', JSON.stringify(updatedStoredData));
    setCondition(!condition);
  };

  const handleEdit = (item, index) => {
    navigate('/Product_update', { state: { product: item, index } });
  };

  return (
    <>
      <div>
        <div className='d-flex justify-content-around align-items-center flex-wrap gap-2'>
          <div className='d-flex justify-content-between align-items-center flex-column p-3 boxA'>
            <h4>Add-Product</h4>
            <p>Total Items: {addItem}</p>
          </div>
          <div className='d-flex justify-content-between align-items-center flex-column p-3 boxA'>
            <h4>Total Price</h4>
            <p>₹ {totalPrice}</p>
          </div>
        </div>
        <div className='mx-3'>
          <h1>Added Products Details</h1>
        </div>

        <div className='mx-2' style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Images</th>
                <th scope="col">Price</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {updateData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><img src={item.images} alt="Product" style={{ width: "50px", height: "50px" }} /></td>
                  <td>{item.price}</td>
                  <td>{item.title.slice(0, 15)}</td>
                  <td>{item.description.slice(0, 25)}</td>
                  <td><MdEdit onClick={() => handleEdit(item, index)} /></td>
                  <td><MdDelete onClick={() => handleDelete(index)} style={{ cursor: 'pointer', color: "red" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
