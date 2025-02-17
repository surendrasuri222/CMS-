import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
// import img from ""
function Unauth() {

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [])


    return (
        <>
            <div className='d-flex justify-content-center'>
                <img src="../img/unauthorised-removebg-preview.jpg" className='col-md-4 row d-flex justify-content-center' alt="Unauthorised" />
            </div>
            <hr />
            <div className='d-flex justify-content-center display-6 text-danger strong'>
                <b>403 Error : Access to only Admin.</b>

            </div>
        </>

    )
}

export default Unauth