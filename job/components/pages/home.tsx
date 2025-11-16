"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

    // import Header from "./header";
export default function Home() {
  useEffect(() => {
    console.log("Home");
  }, []);
  const handleClick = () => {
    router.push("/dashboard");
  }


  const router = useRouter();
  return (
    
   
   <>
    <div className="min-h-screen bg-blue-50">
    
      <main className="flex flex-col items-center justify-center px-8 py-20 mt-10">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gray-900">Find Your</span>{" "}
            <span className="text-blue-600">Dream Job</span>{" "}
            <span className="text-gray-900">Today</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover exciting career opportunities at leading companies. Join thousands of professionals in finding their perfect match.
          </p>
         
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              Explore 1 Job
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="px-8 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-200"
            onClick={handleClick}
            >
              Admin Portal
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>

    
      <section className="px-8 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
       
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
             
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">1</div>
            <div className="text-gray-600">Open Positions</div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Active Candidates</div>
          </div>

        
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>
     
      </section>
    </div>


    <section className="bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-blue-600 mb-16">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 cursor-pointer" onClick={() => router.push("/jobs")}>Browse Jobs</h3>
            <p className="text-gray-600 ">Explore open positions from top companies in your field.</p>
          </div>

        
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Apply Easily</h3>
            <p className="text-gray-600">Submit your application with just a few clicks.</p>
          </div>

       
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Connect</h3>
            <p className="text-gray-600">Get matched with employers looking for your skills.</p>
          </div>

        
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
             
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Get Hired</h3>
            <p className="text-gray-600">Land your dream job and start your new career.</p>
          </div>
        </div>
      </div>
    </section>

    
    <section className="bg-blue-600 py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Find Your Next Opportunity?
        </h2>
        <p className="text-xl text-white mb-8">
          Browse our job listings and start your application today.
        </p>
        <button className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto">
          View All Jobs
         
        </button>
      </div>
    </section>
  

 
    <footer className="bg-gray-900 text-white py-12 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
    
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold">Job Board</span>
          </div>

         <div>
            <h3 className="font-bold text-lg mb-4">For Applicants</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Career Tips
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Post a Job
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700"></div>
      </div>
    </footer>
    </>
  );
}
