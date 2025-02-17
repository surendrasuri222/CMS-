import { useState } from "react";
import { NavLink } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewUser() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        console.log(event.target.value);
    }

    const addUser = () => {

        axios.post("http://localhost:4000/api/users/add", user)
            .then((users) => {
                console.log(users)
                alert(`User created successfully`)
                navigate("/users")
            })
            .catch((err) => {
                if (err.response && err.response.status === 400 && err.response.data === `User already exists`) {
                    alert(`User already exists`);
                }
                else {
                    console.log(`User cannot be added: ${err}`)
                }

            })
        setUser({
            name: "",
            email: "",
            password: ""
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        if (form.checkValidity()) {
            // All required fields are filled, proceed with form submission
            console.log('Form submitted:', formData);
        } else {
            // Some required fields are not filled, show pop-up message
            setShowPopup(true);
        }
    };

    return (
        <div className="border border dark rounded container-fluid w-50 shadow-lg p-3 mb-5 bg-white rounded">
            <h2>New User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName" className="col-form-label">Full Name</label>
                    <input type="text" className="form-control" id="fullName" name="name" value={user.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="col-form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="col-form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="group" className="col-form-label" >Group</label>
                    <input type="text" className="form-control" id="group" disabled />
                </div>

                <div className="d-flex flex-row-reverse">
                    <button type="submit" className="btn btn-primary me-2" onClick={addUser}>Add User</button>
                    <NavLink to='/users'><button type="button" className="btn btn-secondary me-2" data-dismiss="modal">Cancel</button></NavLink>

                </div>
            </form>
        </div>
    )
}