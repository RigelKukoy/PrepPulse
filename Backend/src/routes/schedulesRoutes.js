import express from "express";
import {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  deleteSchedule,
  addTask,
  updateTask,
  deleteTask,
  createReference,
  updateReference,
  deleteReference,
} from "../controllers/schedulesController.js";

const router = express.Router();

//GET all schedule
router.get("/schedule", getAllSchedules);

//GET schedule by id
router.get("/schedule/:id", getScheduleById);

//POST schedule
router.post("/schedule", createSchedule);

//DELETE schedule
router.delete("/schedule/:id", deleteSchedule);

//TASKS
//POST task to a specific schedule
router.post("/schedule/:id/tasks", addTask);
//PUT edit task on a specific schedule
router.put("/schedule/:id/tasks/:task_id", updateTask);
//DELETE task on a specific schedule
router.delete("/schedule/:id/tasks/:task_id", deleteTask);

//REFERENCES
//POST to a specific schedule
router.post("/schedule/:id/references", createReference);
//UPDATE edit task on a specific schedule
router.put("/schedule/:id/references/:ref_id", updateReference);
//DELETE task on a specific schedule
router.delete("/schedule/:id/references/:ref_id", deleteReference);

export default router;
