import express from "express";
import {
  getAllInterns,
  approveIntern,
  rejectIntern
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/interns", getAllInterns);
router.put("/approve/:id", approveIntern);
router.put("/reject/:id", rejectIntern);

export default router;