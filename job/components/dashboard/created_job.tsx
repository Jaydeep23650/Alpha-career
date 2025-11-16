"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreatedJob() {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
    // salary: ""
  });
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        toast.error("Failed to post job: Invalid response from server");
        return;
      }
      
      console.log(data);
      if (response.ok) {
        toast.success("Job posted successfully");
        setFormData({
          title: "",
          department: "",
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message || "Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to connect to server. Make sure the backend is running.");
    }
  };




  return (
    <div className="w-full h-full flex justify-center items-start p-6">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Post New Job</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Senior Frontend Developer"
                className="w-full px-4 py-2 border placeholder-gray-400 text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., Engineering"
                className="w-full px-4 py-2 border placeholder-gray-400 text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., San Francisco, CA"
              className="w-full px-4 py-2 border placeholder-gray-400 text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Job description and requirements..."
              rows={6}
              className="w-full placeholder-gray-400 text-black   px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
