-- Drop tables if they exist (recreate the schema from scratch)
DROP TABLE IF EXISTS schedule_references;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS schedules;

-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    schedule_description TEXT,
    date VARCHAR(30), 
    time VARCHAR(30),
    sched TIMESTAMPTZ,
    progress INTEGER DEFAULT 0,
    total_tasks INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT false
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    sched_id INTEGER NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
    task_description TEXT NOT NULL,
    is_checked BOOLEAN DEFAULT false
);

-- Create schedule_references table
CREATE TABLE IF NOT EXISTS schedule_references (
    id SERIAL PRIMARY KEY,
    reference_id INTEGER NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
    reference_title VARCHAR(50) NOT NULL,
    reference_description TEXT,
    reference_link TEXT
);

-- Function to update totalTasks and progress for a given schedule
CREATE OR REPLACE FUNCTION update_schedule_metrics()
RETURNS TRIGGER AS $$
BEGIN
    -- Update totalTasks (count of tasks for the schedule)
    UPDATE schedules
    SET total_tasks = (SELECT COUNT(*) FROM tasks WHERE sched_id = NEW.sched_id)
    WHERE id = NEW.sched_id;

    -- Update progress (count of tasks with is_checked = true)
    UPDATE schedules
    SET progress = (SELECT COUNT(*) FROM tasks WHERE sched_id = NEW.sched_id AND is_checked = true)
    WHERE id = NEW.sched_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for when a task is inserted
CREATE TRIGGER update_metrics_on_insert
AFTER INSERT ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_schedule_metrics();

-- Trigger for when a task is deleted
CREATE TRIGGER update_metrics_on_delete
AFTER DELETE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_schedule_metrics();

-- Trigger for when a task is updated (e.g., changing is_checked value)
CREATE TRIGGER update_metrics_on_update
AFTER UPDATE OF is_checked ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_schedule_metrics();

-- Sample data for schedules table
INSERT INTO schedules (title, schedule_description, date, time, sched, progress, total_tasks, is_deleted)
VALUES 
    ('Math Exam Preparation', 'Prepare for the upcoming math exam. Focus on solving practice problems.', 'May 30, 2025', '11:00 AM', 'May 30, 2025', 0, 3, true),
    ('Team Meeting', 'Discuss project progress and next steps for the software development team.', 'June 2, 2025', '02:30 PM', 'June 2, 2025', 0, 2, false),
    ('Client Presentation', 'Prepare and practice the client-facing presentation for the new product release.', 'June 10, 2025', '03:00 PM', 'June 10, 2025', 0, 4, true),
    ('Grocery Shopping', 'Buy groceries for the week including fresh vegetables, fruits, and other essentials.', 'June 15, 2025', '10:00 AM', 'June 15, 2025', 0, 2, false),
    ('Project Report Submission', 'Finish writing the final report and submit the project to the supervisor.', 'June 20, 2025', '11:59 PM', 'June 20, 2025', 0, 1, true),
    ('Fitness Routine', 'Morning cardio and strength training.', 'June 5, 2025', '06:00 AM', 'June 5, 2025', 2, 3, false),
    ('Code Review', 'Review merge requests and provide feedback.', 'June 7, 2025', '01:00 PM', 'June 7, 2025', 3, 3, false),
    ('Research Work', 'Continue with literature review and documentation.', 'June 12, 2025', '09:00 AM', 'June 12, 2025', 1, 2, false),
    ('Cleaning Day', 'Thorough cleaning of room and workspace.', 'June 18, 2025', '08:00 AM', 'June 18, 2025', 0, 3, false),
    ('Photography Session', 'Outdoor shoot for the upcoming magazine.', 'June 25, 2025', '04:00 PM', 'June 25, 2025', 3, 3, false);

-- Sample data for tasks table
INSERT INTO tasks (sched_id, task_description, is_checked)
VALUES
    (1, 'Solve algebra practice problems', false),
    (1, 'Review calculus concepts', true),
    (1, 'Watch math video tutorials', false),
    (2, 'Prepare presentation slides', true),
    (2, 'Rehearse meeting pitch', false),
    (3, 'Create presentation deck', false),
    (3, 'Practice speech delivery', false),
    (3, 'Update slides with new content', true),
    (3, 'Prepare notes for Q&A', false),
    (4, 'Buy vegetables', true),
    (4, 'Pick up fruits', true),
    (5, 'Write report introduction', false),
    -- Fitness Routine (sched_id = 6)
    (6, 'Jog for 30 minutes', true),
    (6, 'Do 3 sets of push-ups', true),
    (6, 'Stretch and cool down', false),

    -- Code Review (sched_id = 7)
    (7, 'Review PR #123', true),
    (7, 'Check code standards', true),
    (7, 'Leave feedback in comments', true),

    -- Research Work (sched_id = 8)
    (8, 'Read 3 research papers', true),
    (8, 'Update reference list', false),

    -- Cleaning Day (sched_id = 9)
    (9, 'Vacuum the floor', false),
    (9, 'Organize desk', false),
    (9, 'Disinfect surfaces', false),

    -- Photography Session (sched_id = 10)
    (10, 'Pack camera gear', true),
    (10, 'Scout shooting location', true),
    (10, 'Take test shots', true);

-- Sample data for schedule_references table
INSERT INTO schedule_references (reference_id, reference_title, reference_description, reference_link)
VALUES
    (1, 'Math Study Guide', 'A comprehensive guide to solving advanced algebra problems.', 'https://www.mathstudy.com/guide'),
    (2, 'Team Meeting Agenda', 'An outline of discussion points for the project meeting.', 'https://www.project-meeting.com/agenda'),
    (3, 'Client Pitch Deck', 'A reference to the latest pitch deck for the client presentation.', 'https://www.client-presentation.com/deck');
