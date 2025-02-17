import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Pages from './components/Pages';
import Page from "./components/Page";
import Users from "./components/Users";
import User from "./components/User";
import Categories from "./components/Categories";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import './css/bootstrap.css';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userprofile from "./components/Userprofile";
import ProfileEdit from "./components/ProfileEdit";
import NewUser from "./components/NewUser";
import { NewAndEdit } from "./components/NewAndEdit";
import Search from "./components/Search";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Unauth from "./components/Unauth";
import Bookmark from "./components/Bookmark";


function App() {

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (token) {
      setIsAdminLoggedIn(jwtDecode(token).isAdmin);
      console.log(jwtDecode(token).isAdmin)
    } else {
      setIsAdminLoggedIn(false); // Set isAdminLoggedIn to false if token is not present
    }
  }, [token]);
  return (

    <>
      <Navbar />
      <ToastContainer />

      <Routes>

        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {isAdminLoggedIn ? (
          <Route path="/users" element={<Users />} />
        ) : (
          <Route path="/users" element={<Unauth />} />
        )}

        {
          token && <Route path="/users/add" element={<NewUser />} />
        }

        <Route path="/users/add" element={<NewUser />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/page/:id" element={<Page />} />
        <Route path="/pages/edit/:id" element={<NewAndEdit />} />
        <Route path="/page/new" element={<NewAndEdit />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/userprofile/edit" element={<ProfileEdit />} />
        <Route path="/users/user/:id" element={<User />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/userprofile/edit/:id" element={<ProfileEdit />} />


      </Routes>
    </>

  );
}

export default App;
