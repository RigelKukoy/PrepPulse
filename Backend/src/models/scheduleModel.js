import pool from "../config/db.js";

export const getAllSchedulesService = async () => {
  const result = await pool.query("SELECT * FROM schedules");
  return result.rows;
};

export const getScheduleByIdService = async (id) => {
  const [scheduleResult, tasksResult, referencesResult] = await Promise.all([
    pool.query("SELECT * FROM schedules WHERE id = $1", [id]),
    pool.query(
      "SELECT id, task_description, is_checked FROM tasks WHERE sched_id = $1 ",
      [id]
    ),
    pool.query(
      "SELECT id, reference_title, reference_description, reference_link FROM schedule_references WHERE reference_id = $1 ",
      [id]
    ),
  ]);

  return [
    {
      schedule: scheduleResult.rows[0] || null,
      tasks: tasksResult.rows,
      references: referencesResult.rows,
    },
  ];
};

export const createScheduleService = async ({
  title,
  schedule_description,
  date,
  time,
  sched,
}) => {
  const result = await pool.query(
    "INSERT INTO schedules (title, schedule_description, date, time, sched) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [title, schedule_description, date, time, sched]
  );
  return result.rows[0];
};

export const deleteScheduleService = async (id) => {
  const result = await pool.query(
    "DELETE FROM schedules WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

//TASK OPERATIONS
export const createTaskService = async (id, task_description) => {
  const result = await pool.query(
    "INSERT INTO tasks (sched_id, task_description) VALUES ($1,$2) RETURNING *",
    [id, task_description]
  );

  return result.rows[0];
};

export const updateTaskService = async (id, task_description, is_checked) => {
  const result = await pool.query(
    "UPDATE tasks SET task_description=$2, is_checked=$3 WHERE id = $1 RETURNING *",
    [id, task_description, is_checked]
  );

  return result.rows[0];
};

export const deleteTaskService = async (id) => {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

//REFERENCE OPERATIONS
export const createReferenceService = async (
  id,
  reference_title,
  reference_description,
  reference_link
) => {
  const result = await pool.query(
    "INSERT INTO schedule_references (reference_id, reference_title, reference_description, reference_link) VALUES($1, $2, $3, $4) RETURNING *",
    [id, reference_title, reference_description, reference_link]
  );

  return result.rows[0];
};

export const updateReferenceService = async (
  id,
  reference_title,
  reference_description,
  reference_link
) => {
  const result = await pool.query(
    "UPDATE schedule_references SET reference_title = $2, reference_description = $3, reference_link = $4 WHERE id = $1 RETURNING *",
    [id, reference_title, reference_description, reference_link]
  );

  return result.rows[0];
};

export const deleteReferenceService = async (id) => {
  const result = await pool.query(
    "DELETE FROM schedule_references WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};
