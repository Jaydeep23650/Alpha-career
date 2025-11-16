"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  department: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApplicationForm {
  fullName: string;
  email: string;
  phoneNumber: string;
  resume: File | null;
  coverLetter: string;
}

export default function ViewJob({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<ApplicationForm>({
    fullName: "",
    email: "",
    phoneNumber: "",
    resume: null,
    coverLetter: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof ApplicationForm, string>>
  >({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setJob(data.job);
        } else {
          setError(data.message || "Failed to fetch job");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        setError(
          "Failed to connect to server. Make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };
    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ApplicationForm, string>> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = "Full name must be at least 2 characters";
    } else if (formData.fullName.trim().length > 32) {
      errors.fullName = "Full name must not exceed 32 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ""))) {
      errors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.resume) {
      errors.resume = "Resume is required";
    } else if (formData.resume.type !== "application/pdf") {
      errors.resume = "Only PDF files are allowed";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name as keyof ApplicationForm]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
    if (formErrors.resume) {
      setFormErrors((prev) => ({
        ...prev,
        resume: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName.trim());
      formDataToSend.append("email", formData.email.trim());
      formDataToSend.append("phoneNumber", formData.phoneNumber.trim());
      formDataToSend.append("coverLetter", formData.coverLetter.trim());
      if (formData.resume) {
        formDataToSend.append("resume", formData.resume);
      }
      formDataToSend.append("jobId", jobId);

      const response = await fetch(`http://localhost:5000/api/applications`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success("Application submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          resume: null,
          coverLetter: "",
        });
        const fileInput = document.getElementById("resume") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        toast.error(data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 mt-20">
        <div className="px-8 py-12 text-center">
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-blue-50 mt-20">
        <div className="px-8 py-12 text-center">
          <p className="text-red-600">{error || "Job not found"}</p>
          <button
            onClick={() => router.push("/jobs")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const postedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="min-h-screen bg-blue-50 mt-20">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.push("/jobs")}
          className="mb-6 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Jobs
        </button>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {job.title}
                  </h1>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {job.department}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
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
                  <div className="text-sm">Posted {postedDate}</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Job Description
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Apply for this Job
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John Doe"
                    minLength={2}
                    maxLength={32}
                    required
                  />
                  {formErrors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="john.doe@example.com"
                    required
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.phoneNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                  {formErrors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.phoneNumber}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="resume"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Resume (PDF only) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className={`w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                      formErrors.resume ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {formErrors.resume && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.resume}
                    </p>
                  )}
                  {formData.resume && (
                    <p className="mt-1 text-sm text-gray-600">
                      Selected: {formData.resume.name}
                    </p>
                  )}
                </div>

               <div>
                  <label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
