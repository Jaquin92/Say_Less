INSERT INTO likes (authid,post) VALUES ($1,$2) RETURNING *;