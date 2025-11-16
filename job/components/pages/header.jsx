'use client';
 
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/jobs/");
  }
  const handleLogin = () => {
    router.push("/login");
  }
  return (
    <div>
     <header className="flex items-center justify-between px-8 py-4 fixed top-0 left-0 right-0 z-50 bg-white mb-10">
     
        <div className="flex items-center gap-3">
          <div className="w-20 h-16 bg-blue-600 rounded flex items-center justify-center">
           <Image src="/image/image.png" alt="logo" width={100} height={100} />
          </div>
          <span className="text-2xl font-bold text-gray-900">Alpha Nodus Careers</span>
        </div>
        
        
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2" onClick={handleLogin} >
            Admin
            
          </button>
          <button className="px-6 py-2 bg-blue-600 cursor-pointer text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2" 
          onClick={handleClick} >
            Browse Jobs
          
          </button>
        </div>
      </header>
    </div>
  );
}