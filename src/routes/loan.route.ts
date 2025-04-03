import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin, requireSuperAdmin } from "../middlewares/role.middleware";
import {
  getAllLoans,
  getUserLoans,
  getExpiredLoans,
  deleteLoan,
} from "../controllers/loanController";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get("/", getAllLoans);
router.get("/expired", getExpiredLoans);
router.get("/:userEmail/get", getUserLoans);
router.delete("/:loanId/delete", requireSuperAdmin, deleteLoan);

export default router;