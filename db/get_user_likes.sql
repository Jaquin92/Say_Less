SELECT * FROM posts JOIN likes ON (likes.post = posts.id) WHERE likes.authid = $1;