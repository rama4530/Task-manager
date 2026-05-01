CREATE TABLE IF NOT EXISTS workspaces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    owner_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);