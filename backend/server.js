import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dbConnection from "./db_connection.js";
import Job from "./models/Job.js";
import Application from "./models/Application.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads", "resumes");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `resume-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dbConnection();

app.post("/api/jobs", async (req, res) => {
    try {
        const { title, description, location, department } = req.body;
        
        if (!title || !description || !location || !department) {
            return res.status(400).json({ 
                message: "All fields are required",
                error: "Missing required fields" 
            });
        }

        const newJob = new Job({ title, description, location, department });
        console.log("New job created:", newJob);
        await newJob.save();
        console.log(title, description, location, department);
        res.status(201).json({ message: "Job created successfully", job: newJob });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ 
            message: "Failed to create job",
            error: error.message 
        });
    }
});

app.get("/api/jobs", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
    }
});

app.get("/api/jobs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid job ID" });
        }

        const job = await Job.findById(id);
        
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ job });
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ message: "Failed to fetch job", error: error.message });
    }
});

app.post("/api/applications", (req, res, next) => {
    upload.single("resume")(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({ message: "File size too large. Maximum size is 5MB." });
                }
                return res.status(400).json({ message: err.message });
            }
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, async (req, res) => {
    try {
        const { fullName, email, phoneNumber, coverLetter, jobId } = req.body;

        // Validation
        if (!fullName || !email || !phoneNumber || !jobId) {
            return res.status(400).json({
                message: "Full name, email, phone number, and job ID are required",
            });
        }

        if (fullName.trim().length < 2 || fullName.trim().length > 32) {
            return res.status(400).json({
                message: "Full name must be between 2 and 32 characters",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required (PDF only)",
            });
        }

        // Validate job exists
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid job ID" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            // Delete uploaded file if job doesn't exist
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({ message: "Job not found" });
        }

        // Create application
        const application = new Application({
            jobId,
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            phoneNumber: phoneNumber.trim(),
            resume: `/uploads/resumes/${req.file.filename}`,
            coverLetter: coverLetter || "",
        });

        await application.save();
        console.log("Application created:", application);

        res.status(201).json({
            message: "Application submitted successfully",
            application: {
                id: application._id,
                fullName: application.fullName,
                email: application.email,
            },
        });
    } catch (error) {
        console.error("Error creating application:", error);
        
        // Delete uploaded file if there was an error
        if (req.file && req.file.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkError) {
                console.error("Error deleting file:", unlinkError);
            }
        }

        res.status(500).json({
            message: "Failed to submit application",
            error: error.message,
        });
    }
});

app.get("/api/applications", async (req, res) => {
    try {
        const applications = await Application.find()
            .populate("jobId", "title department location")
            .sort({ createdAt: -1 }); 
        
        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: "Failed to fetch applications", error: error.message });
    }
});

app.post("/api/admin/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username === "admin@example.com" && password === "admin123") {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Failed to login", error: error.message });
    }
});

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})