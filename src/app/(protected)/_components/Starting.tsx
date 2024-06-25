"use client"
import UploadFile from "@/app/(protected)/_components/UploadFile";

interface StartingProps {
  setFileId: (fileId: string) => void;
  setSummary: (summary: string) => void;
  setKeyData: (keyData: string) => void;
  setInsights: (insights:string) => void;
  setError: (error:string | null) => void;
  summary: string | undefined | null;
}


const Starting: React.FC<StartingProps> = ({ setFileId, setSummary, setKeyData, setInsights, summary, setError }) => {
  return (
    <div className={`flex flex-col w-screen h-fill-available justify-start items-center pt-20 md:pt-0 md:justify-center md:items-center  ${summary ? 'hidden':''}`}>
        <h1 className="mb-8 text-7xl font-extrabold text-gray-900 dark:text-white md:text-6xl lg:text-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-400">Servi</span>
          ces
        </h1>
        <p className="w-3/4 text-lg font-normal text-gray-500 text-center mb-8 lg:text-xl dark:text-gray-400">
          Upload a DOCX, PDF, or TXT file, and get a detailed analysis with ChatGPT.<br /> Our service provides you with a concise summary, highlights key phrases, and extracts valuable insights from your documents. Whether you&apos;re working with reports, articles, or any text-based files, our advanced AI-powered tool ensures you get the most out of your content. Simplify your workflow and enhance your productivity with our comprehensive document analysis service.      </p>
        <UploadFile setFileId={setFileId} setSummary={setSummary} setKeyData={setKeyData} setInsights={setInsights} setError={setError}/>
    </div>
  );
}
export default Starting;

