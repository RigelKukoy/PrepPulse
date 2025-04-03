import {
  createScheduleService,
  deleteScheduleService,
  getAllSchedulesService,
  getScheduleByIdService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
  createReferenceService,
  updateReferenceService,
  deleteReferenceService,
} from "../models/scheduleModel.js";
import handleResponse from "../utils/responseHandler.js";

//@desc GET all schedules
//@route GET /api/schedule
export const getAllSchedules = async (req, res, next) => {
  try {
    const schedules = await getAllSchedulesService();
    handleResponse(
      res,
      201,
      "Schedules has been retrieved successfully",
      schedules
    );
  } catch (err) {
    next(err);
  }
};

//@desc GET schedule by id
//@route GET /api/schedule/:id
export const getScheduleById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const schedule = await getScheduleByIdService(id);
    if (!schedule) {
      return handleResponse(res, 404, "Schedule not found");
    }
    handleResponse(
      res,
      201,
      `Schedule with id: ${id} has been retrieved successfully`,
      schedule
    );
  } catch (err) {
    next(err);
  }
};

//@desc  create a new schedule
//@route POST /api/schedule
export const createSchedule = async (req, res, next) => {
  const { title, schedule_description, date, time, sched } = req.body;
  try {
    const newSchedule = await createScheduleService({
      title,
      schedule_description,
      date,
      time,
      sched,
    });
    handleResponse(res, 201, "Schedule created successfully", newSchedule);
  } catch (err) {
    next(err);
  }
};

//@desc  delete a schedule
//@route DELETE /api/schedule
export const deleteSchedule = async (req, res, next) => {
  try {
    const deletedSchedule = await deleteScheduleService(req.params.id);
    if (!deletedSchedule) {
      return handleResponse(
        res,
        404,
        `deletion of schedule with id: ${req.params.id} has failed`
      );
    }
    handleResponse(
      res,
      201,
      `Schedule with id: ${id} has been deleted successfully`,
      deletedSchedule
    );
  } catch (err) {
    next(err);
  }
};

//@desc  add a task
//@route POST /api/schedule/:id/tasks
export const addTask = async (req, res, next) => {
  const { id } = req.params;
  const { task_description } = req.body;
  try {
    const taskToAdd = await createTaskService(id, task_description);
    handleResponse(
      res,
      201,
      `task successfully added to schedule id:${id}`,
      taskToAdd
    );
  } catch (err) {
    next(err);
  }
};

//@desc  update a task
//@route PUT /api/schedule/:id/tasks/:taskid
export const updateTask = async (req, res, next) => {
  const { task_id } = req.params;
  const { task_description, is_checked } = req.body;
  try {
    const updateTask = await updateTaskService(
      task_id,
      task_description,
      is_checked
    );
    handleResponse(res, 201, `task successfully updated`, updateTask);
  } catch (err) {
    next(err);
  }
};

//@desc delete a task
//@route PUT /api/schedule/:id/tasks/:task_id
export const deleteTask = async (req, res, next) => {
  const { task_id } = req.params;

  try {
    const taskToUpdate = await deleteTaskService(task_id);
    handleResponse(res, 201, "Task deleted successfully", taskToUpdate);
  } catch (err) {
    next(err);
  }
};

//@desc create a reference
//@route POST /api/schedule/:id/references/:ref_id
export const createReference = async (req, res, next) => {
  const { id } = req.params;
  const { reference_title, reference_description, reference_link } = req.body;

  try {
    const createReference = await createReferenceService(
      id,
      reference_title,
      reference_description,
      reference_link
    );

    handleResponse(res, 201, "Reference created successfully", createReference);
  } catch (err) {
    next(err);
  }
};

//@desc create a reference
//@route  UPDATE /api/schedule/:id/references/:ref_id
export const updateReference = async (req, res, next) => {
  const { ref_id } = req.params;
  const { reference_title, reference_description, reference_link } = req.body;

  try {
    const updateReference = await updateReferenceService(
      ref_id,
      reference_title,
      reference_description,
      reference_link
    );

    handleResponse(res, 201, "Reference updated successfully", updateReference);
  } catch (err) {
    next(err);
  }
};

export const deleteReference = async (req, res, next) => {
  const { ref_id } = req.params;

  try {
    const taskToDelete = await deleteReferenceService(ref_id);
    handleResponse(res, 201, "Reference deleted successfully", taskToDelete);
  } catch (err) {
    next(err);
  }
};
