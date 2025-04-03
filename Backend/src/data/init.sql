DROP TABLE IF EXISTS schedule_references;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    schedule_description TEXT,
    date VARCHAR(30), 
    time VARCHAR(30),
    sched TIMESTAMPTZ
);
    
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    sched_id INTEGER NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
    task_description TEXT NOT NULL,
    is_checked BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS schedule_references (
    id SERIAL PRIMARY KEY,
    reference_id INTEGER NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
    reference_title VARCHAR(50) NOT NULL,
    reference_description TEXT,
    reference_link TEXT
);
