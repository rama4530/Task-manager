CREATE TABLE IF NOT EXISTS TASKS(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress','done')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
    due_date TIMESTAMP,
    project_id INT NOT NULL REFERENCES projects(id),
    assigned_to INT REFERENCES users(id),
    deleted_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);