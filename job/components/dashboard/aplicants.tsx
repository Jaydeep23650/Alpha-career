"use client";
import { useEffect, useState } from "react";
import { getApiUrl, API_BASE_URL } from "@/config/api";

interface Application {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  resume: string;
  coverLetter?: string;
  jobId: {
    _id: string;
    title: string;
    department: string;
    location: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export default function Applicants() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await fetch(getApiUrl("/applications"));
        const data = await response.json();
        console.log("Applications fetched:", data);

        if (response.ok) {
          setApplications(data.applications || []);
        } else {
          setError(data.message || "Failed to fetch applications");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError(
          "Failed to connect to server. Make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownloadResume = (resumePath: string) => {
    // Remove /api from base URL for static file serving
    const baseUrl = API_BASE_URL.replace('/api', '');
    const resumeUrl = `${baseUrl}${resumePath}`;
    window.open(resumeUrl, "_blank");
  };

  return (
    <div className="w-full h-full p-6">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Job Applicants
      </h1>

      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading applicants...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && applications.length === 0 && (
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 text-center">
          <p className="text-gray-600">
            No applicants yet. Applications will appear here when students apply
            for jobs.
          </p>
        </div>
      )}

      {!loading && !error && applications.length > 0 && (
        <div className="w-full flex flex-col gap-4">
          {applications.map((application) => (
            <div
              key={application._id}
              className="w-full bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {application.fullName}
                        </h2>
                        <p className="text-gray-600 mt-1">
                          {application.email}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Applicant
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span>{application.phoneNumber}</span>
                      </div>

                      {application.jobId && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm font-semibold text-blue-900 mb-2">
                            Applied for:
                          </p>
                          <h3 className="text-lg font-bold text-blue-900">
                            {application.jobId.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                              {application.jobId.department}
                            </span>
                            <div className="flex items-center gap-1 text-blue-700 text-sm">
                              <span>{application.jobId.location}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {application.coverLetter && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            Cover Letter:
                          </p>
                          <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200 whitespace-pre-wrap">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}

                      <p className="text-gray-500 text-sm mt-4">
                        Applied on {formatDate(application.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-48 flex flex-col gap-3">
                  <button
                    onClick={() => handleDownloadResume(application.resume)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                  
                    View Resume
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
