CREATE TABLE IF NOT EXISTS workspace_members(
    workspace_id INT NOT NULL REFERENCES workspaces(id),
    user_id INT NOT NULL REFERENCES users(id),
    role VARCHAR(10) DEFAULT 'member' CHECK (role IN ('admin','member','viewer')),
    joined_at TIMESTAMP DEFAULT NOW(),

    PRIMARY KEY (workspace_id,user_id)
);