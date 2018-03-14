INSERT INTO posts (authid,body,name,category,title,img,userid)
VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;