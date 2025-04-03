import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";
import loanRoute from "./routes/loan.route";

dotenv.config();
const app = express();
const PORT = process.env.PORT



// Middleware
app.use(express.json());
app.use(cors());

// Health check
app.get("/", (req, res) => {
    res.send("Loan Management API is running");
  });

// Routes
app.use("/api/auth", authRoute);
app.use("/api/loans", loanRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});