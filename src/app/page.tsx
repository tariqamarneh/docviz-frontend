import NavBar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <NavBar/>
      <div className="h-fill-available flex flex-col items-center justify-center">
        <h1 className="mb-8 text-7xl font-extrabold text-gray-900 dark:text-white md:text-6xl lg:text-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-400">Doc</span>
          Viz
        </h1>
        <p className="text-lg font-normal w-3/4 text-gray-500 text-center mb-8 lg:text-xl dark:text-gray-400">
        Explore our document analyzer services tailored to elevate your digital experience. summarize, extract key phrases and insights from your documents with ChatGPT-4o. Revolutionize your interactions with our advanced document analyzer solutions.
        </p>
        <a href="/signup" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gradient-to-r to-blue-700 from-sky-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
          Sign up
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
    </>
  );
}
