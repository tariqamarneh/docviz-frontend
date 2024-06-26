"use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navbar: React.FC = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { token } = useCurrentUser();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setNavbarOpen(!navbarOpen);
    };

    const handleSignOut = () => {
        signOut();
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-indigo-800 shadow-lg' 
                : 'bg-transparent'
        }`}>
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="/" className="flex items-center space-x-3">
                            <Image src="/logo.png" className="w-10 h-10" alt="DocViz Logo" width={40} height={40}/>
                            <span className="text-2xl font-bold text-white">DocViz</span>
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink href="/" active>Home</NavLink>
                            <NavLink href="/services">Services</NavLink>
                            <NavLink href="/contact">Contact</NavLink>
                            {token ? (
                                <button onClick={handleSignOut} className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-blue-200 transition-colors duration-200">
                                    Sign out
                                </button>
                            ) : (
                                <NavLink href="/signin" special>Sign in</NavLink>
                            )}
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-expanded={navbarOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {navbarOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${navbarOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-800">
                    <MobileNavLink href="/" active>Home</MobileNavLink>
                    <MobileNavLink href="/services">Services</MobileNavLink>
                    <MobileNavLink href="/contact">Contact</MobileNavLink>
                    {token ? (
                        <button onClick={handleSignOut} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 transition-colors duration-200">
                            Sign out
                        </button>
                    ) : (
                        <MobileNavLink href="/signin" special>Sign in</MobileNavLink>
                    )}
                </div>
            </div>
        </nav>
    );
}

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    active?: boolean;
    special?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active, special }) => {
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
    const activeClasses = "text-blue-600 dark:text-blue-400";
    const inactiveClasses = "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400";
    const specialClasses = "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700";

    return (
        <a
            href={href}
            className={`${baseClasses} ${active ? activeClasses : special ? specialClasses : inactiveClasses}`}
        >
            {children}
        </a>
    );
}

const MobileNavLink: React.FC<NavLinkProps> = ({ href, children, active, special }) => {
    const baseClasses = "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200";
    const activeClasses = "bg-blue-500 text-white";
    const inactiveClasses = "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800";
    const specialClasses = "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700";

    return (
        <a
            href={href}
            className={`${baseClasses} ${active ? activeClasses : special ? specialClasses : inactiveClasses}`}
        >
            {children}
        </a>
    );
}

export default Navbar;