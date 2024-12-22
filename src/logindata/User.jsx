import React from 'react'
import img from "..//logindata/gan.jpg"

const User = () => {
           const logindata=JSON.parse(localStorage.getItem("LoggedIn"))||{};


    return (
        <>
            <div class="container rounded bg-white mt-5 mb-5 ">
                <div class="row">
                    <div class="col-md-3 border-right">
                        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img class="rounded-circle mt-5" width="150px" src={img} />
                            <span class="font-weight-bold">{logindata.name}</span>
                            <span class="text-black-50">{logindata.email}</span>
                            <span> </span>
                        </div>
                    </div>
                    <div class="col-md-9 border-right">
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h4 class="text-right">Profile Settings</h4>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-12">
                                    <label class="labels">Name</label>
                                    <input type="text" class="form-control" placeholder="first name" value={logindata.name} readOnly/>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <label class="labels">Mobile Number</label>
                                    <input type="text" class="form-control" placeholder="enter phone number" value={logindata.phone} readOnly/>
                                </div>
                                <div class="col-md-12">
                                    <label class="labels">Address</label>
                                    <input type="text" class="form-control" placeholder="enter address line 1" value={logindata.Address} readOnly/>
                                </div>
                                <div class="col-md-12">
                                    <label class="labels">Email ID</label>
                                    <input type="text" class="form-control" placeholder="enter email id" value={logindata.email} readOnly/>
                                </div>
                            </div>

                            <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default User