import React from 'react'

const SeloreUser = () => {
   
    const logindata=JSON.parse(localStorage.getItem("selore-login"))||{};

    return (
        <>
            <div className="container rounded  mt-5 mb-5  " style={{background: "transparent"}}>
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src=""/>
                            <span className="font-weight-bold">{logindata.name}</span>
                            <span className="text-black-50">{logindata.email}</span>
                            <span> </span>
                        </div>
                    </div>
                    <div className="col-md-9 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <label className="labels">Name</label>
                                    <input type="text" className="form-control" placeholder="first name" value={logindata.name} readOnly/>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Mobile Number</label>
                                    <input type="text" className="form-control" placeholder="enter phone number" value={logindata.phone} readOnly/>
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Address</label>
                                    <input type="text" className="form-control" placeholder="enter address line 1" value={logindata.Address} readOnly/>
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Email ID</label>
                                    <input type="text" className="form-control" placeholder="enter email id" value={logindata.email} readOnly/>
                                </div>
                            </div>

                            <div className="mt-5 text-center">
                                <button className="btn btn-primary profile-button" type="button">Save Profile</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SeloreUser