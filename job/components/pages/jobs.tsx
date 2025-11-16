"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getApiUrl } from "@/config/api";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  department: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Jobs() {
  const router = useRouter();
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl("/jobs"));
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setAllJobs(data.jobs || []);
        } else {
          setError(data.message || "Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to connect to server. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);


  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) {
      return allJobs;
    }

    const seach_inputs_var = searchTerm.toLowerCase().trim();
    return allJobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(seach_inputs_var) ||
        job.department.toLowerCase().includes(seach_inputs_var) ||
        job.location.toLowerCase().includes(seach_inputs_var) ||
        job.description.toLowerCase().includes(seach_inputs_var)
      );
    });
  }, [allJobs, searchTerm]);

  return (
    <div className="min-h-screen bg-blue-50 mt-20">
      <div className="px-8 py-12 text-center ">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Find Your Next Opportunity
        </h1>
        <p className="text-lg text-gray-600">
          Explore open positions and join our growing team.
        </p>
      </div>

      <div className="px-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
              
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by job title, department, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="px-8 mb-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700">
            {loading
              ? "Loading..."
              : `${filteredJobs.length} job${filteredJobs.length !== 1 ? "s" : ""} found${searchTerm ? ` for "${searchTerm}"` : ""}`}
          </p>
        </div>
      </div>

      {loading && (
        <div className="px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm text-center">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && allJobs.length === 0 && (
        <div className="px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <p className="text-gray-600">No jobs available at the moment. Check back later!</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && allJobs.length > 0 && filteredJobs.length === 0 && searchTerm && (
        <div className="px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <p className="text-gray-600">
                No jobs found matching &quot;{searchTerm}&quot;. Try a different search term.
              </p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && filteredJobs.length > 0 && (
        <div className="px-8 pb-12">
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredJobs.map((job) => {
            const postedDate = job.createdAt
              ? new Date(job.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              : "Recently";

            return (
              <div
                key={job._id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {job.title}
                      </h2>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {job.department}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{job.location}</span>
                      </div>

                      <p className="text-gray-600 line-clamp-2">{job.description}</p>

                      <p className="text-gray-600 text-sm">Posted {postedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-end md:items-center">
                    <button 
                      onClick={() => router.push(`/jobs/${job._id}`)}
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                    Apply Now
                    </button>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
