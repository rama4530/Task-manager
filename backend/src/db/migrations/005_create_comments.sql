CREATE TABLE IF NOT EXISTS comments(
    id SERIAL PRIMARY KEY,
    body VARCHAR(500) NOT NULL,
    task_id INT NOT NULL REFERENCES tasks(id),
    author_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);