"use client"
import React from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    const toggleMenu = () => {
        setNavbarOpen(!navbarOpen);
      };
      const onClick = () =>{
        signOut();
      }

    return (
        <nav className="border-gray-200 fixed w-full t-0 z-50 right-0 bg-gradient-to-r to-gray-400 from-gray-100 dark:bg-gradient-to-r dark:to-slate-900 dark:from-slate-600">
            <div className="max-w-screen-max flex flex-wrap items-center justify-between mx-auto p-2 pl-7">
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src="/logo.png" className="w-14" alt="airefme Logo" width={100} height={100}/>
                    <span className="self-center text-2xl text-black font-semibold whitespace-nowrap dark:text-white">DocViz</span>
                </a>
                <button 
                    data-collapse-toggle="navbar-default" 
                    type="button" 
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                    aria-controls="navbar-default" 
                    aria-expanded={navbarOpen}
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`${!navbarOpen && "hidden"} w-full md:block md:w-auto pr-11 `} id="navbar-default">
                    <ul className={`font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700 ${navbarOpen && "bg-gray-200 dark:bg-gray-800"}`}>
                        <li>
                            <a href="/Services" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/Services" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Services</a>
                        </li>
                        <li>
                            <a href="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                        </li>
                        <li className="border-solid border-x-4 border-blue-700 rounded-lg pl-1 pr-1">
                            <button onClick={onClick} className="w-full text-left block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
