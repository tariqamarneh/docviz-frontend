"use client"
import React, { useState } from "react";
import Navbar from "./_components/Navbar";
import Error from '@/app/(protected)/_components/Error'
import Success from '@/app/(protected)/_components/Success'
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import { submitContactForm } from "@/actions/apiService";


const Contact = () => {
  const {token_type, token} = useCurrentUser();
  const [success, setSuccess] = useState<string | null | undefined>(null);
  const [error, setError] = useState<string | null | undefined>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await submitContactForm(formData, token_type, token);
      setSuccess('Message sent successfully');
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error:any) {
      setError(error.message);
      if (error.message === 'Please login first.') {
        signOut();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };


  return (
    <>
      <Navbar />
      <Error message={error} setError={setError} />
      <Success message={success} setSuccess={setSuccess} />
      <section className="" id="contact">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-4">
            <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
              <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                Contact
              </p>
              <h2
                className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">In hac habitasse platea
                dictumst
              </p>
            </div>
          </div>
          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2">
              <div className="h-full pr-6">
                <p className="mt-3 mb-12 text-lg text-gray-600 text-center md:text-start dark:text-slate-400">
                  We&apos;d love to hear from you! Whether
                  you have a question about our services,need assistance,
                  or just want to share your feedback, feel free to reach out to us.
                </p>
                <ul className="mb-6 md:mb-0">
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="h-6 w-6">
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                        <path
                          d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z">
                        </path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Our Address
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">11183 Hazza&apos; Al-Majali Street</p>
                      <p className="text-gray-600 dark:text-slate-400">Amman, Jordan</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="h-6 w-6">
                        <path
                          d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                        </path>
                        <path d="M15 7a2 2 0 0 1 2 2"></path>
                        <path d="M15 3a6 6 0 0 1 6 6"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">Mobile: +962 (79) 887-6598</p>
                      <p className="text-gray-600 dark:text-slate-400">Mail: tariq.haj.naser@pwc.com</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="h-6 w-6">
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                        <path d="M12 7v5l3 3"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Working
                        hours</h3>
                      <p className="text-gray-600 dark:text-slate-400">Sunday - Thursday: 09:00 - 17:00</p>
                      <p className="text-gray-600 dark:text-slate-400">Saturday &amp; Sunday: 011:00 - 20:00</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Ready to Get Started?</h2>
                <form id="contactForm" onSubmit={handleOnSubmit}>
                  <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label htmlFor="name" className="pb-1 text-xs uppercase tracking-wider"></label>
                        <input 
                          type="text" 
                          id="name" 
                          autoComplete="given-name" 
                          placeholder="Your name" 
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md text-gray-700 dark:text-gray-300 sm:mb-0 bg-transparent" 
                          name="name" 
                          onChange={handleInputChange}
                          value={formData.name}
                          required
                          />
                      </div>
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider"></label>
                        <input 
                          type="email" 
                          id="email" 
                          autoComplete="email" 
                          placeholder="Your email address" 
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md text-gray-700 dark:text-gray-300 sm:mb-0 bg-transparent" 
                          name="email"
                          onChange={handleInputChange}
                          value={formData.email}
                          required
                          />
                      </div>
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label htmlFor="message" className="pb-1 text-xs uppercase tracking-wider"></label>
                      <textarea 
                        id="message" 
                        name="message" 
                        cols={30} 
                        rows={5} 
                        placeholder="Write your message..." 
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md text-gray-700 dark:text-gray-300 sm:mb-0 bg-transparent"
                        onChange={handleInputChange}
                        value={formData.message}
                        required
                        >
                      </textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white px-6 py-3 font-xl rounded-lg sm:mb-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
