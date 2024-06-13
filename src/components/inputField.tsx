interface InputProps {
    htmlFor: string;
    text: string;
    isPending: boolean;
    type:string;
    placeholder: string;
    validator: any
    error: any;
  }
  
export default function Input({ htmlFor, text, isPending, type, placeholder, validator, error }: InputProps){
    return (
        <>
            {!error ?(
                <div className="mb-5">
                    <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text}</label>
                    <input autoComplete="on" name={htmlFor} id={htmlFor} disabled={isPending} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required {...validator}/>
                </div>):(
                <div className="mb-5">
                    <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium text-red-500 dark:text-red-500">{text}</label>
                    <input autoComplete={htmlFor} name={htmlFor} id={htmlFor} disabled={isPending} type={type} className="mb-1 bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder={placeholder} required {...validator}/>
                    <label className="text-red-500">{error}</label>
                </div>
                )
            }
        </>
    )
}