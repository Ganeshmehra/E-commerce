
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
const Cart_item = ({ first,second, setsecond }) => {
    const [cartarr, setCartarr] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("cartItems")) || [];
        const login = JSON.parse(localStorage.getItem("LoggedIn")) || {};
        let selectdata = data.filter(item => item.email === login.email);
        setCartarr(selectdata);
        
        let total = 0;
        selectdata.forEach(item => {
            total += item.price * (item.quantity || 1);

        });
        setTotalPrice(total);

    }, [second]);

    const QuantityChange = (index, value) => {
        const newCartArr = [...cartarr];
        newCartArr[index].quantity = value;
        setCartarr(newCartArr);
        localStorage.setItem("cartItems", JSON.stringify(newCartArr));
        setsecond(!second);
    }

    const RemoveItem = (index) => {
        const removitem = cartarr.filter((_, i) => i !== index);
        setCartarr(removitem);
        localStorage.setItem("cartItems", JSON.stringify(removitem));
        setsecond(!second);
    }

    const proceed=()=>{
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "proceed",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: "proceed to Checkout!",
                text: "proceed to Checkout.",
                icon: "success"
              });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Bot Buy",
                icon: "error"
              });
            }
          });
    }
 
    return (<>
       <div className=' d-flex breck 'style={{ background: "rgb(197 197 197 / 32%)",fontSize:"auto"}}>
       <div className="card container m-2 ">
            <h1 className='text-center'>Carted Data</h1>
            <div className="row m-3 text-center">
                {cartarr.map((e, index) => (
                    <div key={index}>
                        <div className="card  w-100 m-3">
                            <div className='d-flex justify-content-evenly align-items-center text-center flex-wrap mx-3'>
                                <p>{index + 1}</p>
                                <div className="card-img-top" style={{ width:"93px", height: "93px"}}><img src={e.images} style={{  width:"100%", height: "100%", padding: "25px"}} alt="..." /></div>
                                <div className=" text-center">
                                    <h5 className="">{e.title}</h5>
                                    <p className="">price:{e.price}</p>
                                </div>
                                <div className='d-flex justify-content-evenly align-items-center text-center flex-wrap'>
                                    <p className="card-text ">Quantity:</p>
                                    <input type="number" style={{ width: "49px", height: "20px" }} min={1} max={10} placeholder='1' onChange={(e) => QuantityChange(index, parseInt(e.target.value))} value={e.quantity || 1} />
                                </div>
                                <div className='d-flex justify-content-evenly  align-items-center '>
                                    <p className="card-text ">Total:</p>
                                    <p>{e.price * (e.quantity || 1)}</p>
                                </div>
                                <div className='d-flex justify-content-evenly align-items-center '>
                                    <MdDelete onClick={() => RemoveItem(index)} className="text-danger fs-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="m-2" >
            <div className=" ">
                <div className=" text-center p-2 " style={{ background: "#d9fbff52" }}>
                    <h5 className="title">Total price:{totalPrice}</h5>
                    <p>Total Itam Quantity:-{first} </p>
                    <button className="btn btn-success btn-sm" onClick={proceed}>proceed to Checkout</button>
                </div>
            </div>

        </div>
       </div>
    </>
    );
}

export default Cart_item;
