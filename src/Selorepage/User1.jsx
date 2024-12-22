import React from 'react'

const User1 = () => {

    const Userdata = JSON.parse(localStorage.getItem("Data1")) || [];


    return (
        <><div className='m-2 text-center' style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <table className="table " >
                <tr className='p-2'>
                    <th scope="col" className="border-2">s.no</th>
                    <th scope="col" className="border-2">Name</th>
                    <th scope="col" className="border-2">Email</th>
                    <th scope="col" className="border-2">Address</th>
                </tr>
                <tbody>
                    {Userdata.map((e, i) => (
                        <tr >
                            <td className="border-2">{i + 1}</td>
                            <td className="border-2" >{e.name}</td>
                            <td className="border-2">{e.email}</td>
                            <td className="border-2">{e.Address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default User1