import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { RiStarSmileLine } from "react-icons/ri";
import { BiCartDownload } from "react-icons/bi";

const img1 = 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRV7ekl1-b2-8wBpDJBYRHqoBryuW4OfAFMbzVav6zX1OoliozIyGZoz0b1r9zmOD3mTbg9_v8_48rMIB8o7SZjukG_tXRlh3pAm7Uu_AIZMcasRqYcpPhwMQ';
const img2 = 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTAax05sgNj9NMdDqiME5Ge95MKS1iIsAFSErDj22WRYPS3L9gWSMKUHKdAxgNd-7GcsWS_y25LQVe6OyXVyB0ae0lKTu-u819N3IPQlKbJ';
const img3 = 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSjpppccX3gEbGAQs0m-zpVxoVbWNHM2EG_Kyy55czoVoV2Av0BJNE9LECbShkfdLMH4FUiyvK_f7BgonRcyckCj419-n5DNUerFgVs5yO63ut4azqB1K1Nsg';

const Pro2 = (props) => {
    const [search, setSearch] = useState([]);
    const [category, setCategory] = useState('');
    const [range, setRange] = useState(0);
    const [arr, setArr] = useState([]); // State to store fetched data

    useEffect(() => {
        let Arrays = JSON.parse(localStorage.getItem("update-data")) || [];
        setArr(Arrays); // Set fetched data to state
        setSearch(Arrays); // Initialize search results with fetched data
    }, []);


    const sweetalert2 = (e) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: e.title,
            text: e.description.slice(0, 25),
            imageUrl: e.images,
            imageWidth: 300,
            imageHeight: 250,
            imageAlt: "Custom image",
            showCancelButton: true,
            confirmButtonText: "Yes, Cart item it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                let email1 = JSON.parse(localStorage.getItem("LoggedIn")) || {};
                if (email1.email && email1.email.length > 0) {
                    const GmailItems = cartItems.filter(item => (item.title === e.title) && (item.email === email1.email));
                    if (GmailItems.length === 0) {
                        cartItems.push({
                            title: e.title,
                            price: e.price,
                            images: e.images,
                            email: email1.email,
                            quantity: 1
                        });

                        localStorage.setItem('cartItems', JSON.stringify(cartItems));
                        props.setsecond(!props.second);

                        swalWithBootstrapButtons.fire({
                            title: "Cart item!",
                            text: "Your item has been added to the cart.",
                            icon: "success"
                        });
                    } else {
                        swalWithBootstrapButtons.fire({
                            title: "Already in Cart",
                            text: "This item is already in your cart.",
                            icon: "info"
                        });
                    }
                } else {
                    swalWithBootstrapButtons.fire({
                        title: 'Please Login',
                        text: 'You need to log in to add items to the cart.',
                        icon: 'error'
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your item is Cancelled.",
                    icon: "success"
                });
            }
        });
    };


    const SearchData = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const searched = arr.filter(item =>
            item.title.toLowerCase().includes(searchValue)
        );
        FilterCategory(searched, category);
    };

    const handleRange = (e) => {
        const selectRange = parseInt(e.target.value);
        setRange(selectRange);
        const Searched = arr.filter(item => item.price <= selectRange);
        FilterCategory(Searched, category);
    };

    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setCategory(selected);
        FilterCategory(arr, selected);
    };

    const FilterCategory = (items, selected) => {
        const filteredData = selected
            ? items.filter(item => item.category.toLowerCase() === selected)
            : items;
        setSearch(filteredData);
    };

    return (
        <>
            <div style={{ backgroundColor: "#fff",width:"100%" }}>
                <div className='d-flex justify-content-between flex-wrap nev  shadow ' style={{top: "84px",paddingTop: "5px",background: "white"}} >
                    <input type="text" id="titleInput" placeholder="Search by title..." onInput={SearchData} className="text" style={{ margin: "0 12px" }} />
                    <div className='d-flex gap-2' >
                        <div className='text-dark'>Price:-</div>
                        <input type="range" id="titleInput" onInput={handleRange} min={"500"} max={"2000"} step={"10"} className="text" style={{ margin: "0 12px" }} />
                        <p>{range}</p>
                    </div >
                    <select onChange={handleCategoryChange} className="text" style={{ margin: "0 12px" }}>
                        <option value="">All Product</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="child">Child</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>

                <section class="container-fluid  d-flex justify-content-evenly " style={{ backgroundColor: "#dcf4cc", width: "97%", margin: " 9px 20px" }} id="Home">
                    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">

                            <div class="carousel-item active"  >

                                <div class="d-flex  fix">
                                    <div class="content p-2">
                                        <span className='fs-2 text-danger'>zara shooes</span>
                                        <h3>Man shooes</h3>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque similique amet vero.
                                        </p>
                                        <h1>50% OFF</h1>
                                    </div>
                                    <div class="image p-2" style={{ width: "300px", height: "250px" }}>
                                        <img src={img1} width="100%" height="100%" style={{ borderRadius: "15px" }} alt="" />
                                    </div>
                                </div>
                            </div>

                            <div class="carousel-item" >
                                <div class="d-flex   fix">
                                    <div class="content p-2">
                                        <span className='fs-2 text-primary'>zara shooes</span>
                                        <h3>adidas Men Trainers shooes</h3>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque similique amet vero.
                                        </p>
                                        <h1>60% OFF</h1>
                                    </div>
                                    <div class="image p-2" style={{ width: "300px", height: "250px" }}>
                                        <img src={img2} width="100%" height="100%" style={{ borderRadius: "15px" }} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="d-flex   fix ">
                                    <div class="content p-2">
                                        <span className='fs-2 text-info'>zara shooes</span>
                                        <h3> Campus Men shooes</h3>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque similique amet
                                            vero.</p>
                                        <h1>30% OFF</h1>
                                    </div>
                                    <div class="image p-2" style={{ width: "300px", height: "250px" }}>
                                        <img src={img3} width="100%" height="100%" style={{ borderRadius: "15px" }} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="swiper-pagination"></div>
                    </div>
                </section>
                <div className='d-flex flex-wrap justify-content-evenly ' style={{ margin: "20px" }}>
                    {search.map((e) => (
                        <div className="d-flex flex-column h-100 text-center main" key={e.id} >
                            <div style={{ width: "200px", height: "150px" }}>
                                <img src={e.images} style={{ borderRadius: "15px" }} width="100%" height="100%" alt="No image" />
                            </div>
                            <p>{e.title.slice(0, 15)}</p>
                            <p>price:{e.price}</p>
                            <p>Crat Item: <BiCartDownload onClick={() => sweetalert2(e)} className='mx-3 fs-3' style={{ color: 'blue' }} /></p>
                            <p><RiStarSmileLine className='text-warning' /><RiStarSmileLine className='text-warning' /><RiStarSmileLine className='text-warning' /><RiStarSmileLine /><RiStarSmileLine /></p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Pro2;
