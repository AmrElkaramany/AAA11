import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiFillAccountBook } from "react-icons/ai";
import { UserContext } from "../../Context/UserContext";


export default function Navbar() {
  const navigate = useNavigate()
const {token , setToken} = useContext(UserContext) 

 const logout = ()=>{
localStorage.removeItem('userToken')
setToken(null)
navigate('/login')

 }

  return (
    <>
      <nav className="bg-[#3F83F8] border-gray-200 dark:bg-gray-900 fixed top-0 right-0 left-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse text-white"
          >
            <AiFillAccountBook size={30} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              NoteApp
            </span>
          </Link>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
             
             {token ? <>
              <li>
                <NavLink
                  to={"/"}
                  className="block py-2 px-3 text-white "
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <span
                onClick={logout}
                  
                  className=" cursor-pointer block py-2 px-3 text-white "
                  aria-current="page"
                >
                  logout
                </span>
              </li>
             
             </> : <>
             
             <li>
                <NavLink
                  to={"register"}
                  className="block py-2 px-3 text-white "
                  aria-current="page"
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"login"}
                  className="block py-2 px-3 text-white "
                  aria-current="page"
                >
                  Login
                </NavLink>
              </li>
             </>}
              
          
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
