-- TABLE USERS
CREATE TABLE users
(
    users_id VARCHAR NOT NULL PRIMARY KEY,
    users_name VARCHAR(255),
    users_email VARCHAR(255),
    users_phone VARCHAR(255),
    users_password VARCHAR(255),
    users_confirmpassword VARCHAR(255),
    users_photo VARCHAR(255)
);

CREATE TABLE categories
(
    category_id VARCHAR NOT NULL PRIMARY KEY,
    category_name VARCHAR(255)
);

CREATE TABLE recipes
(
    recipes_id VARCHAR PRIMARY KEY,
    recipes_title VARCHAR(255),
    recipes_ingredients VARCHAR(255) ,
    recipes_photo VARCHAR(255),
    recipes_video VARCHAR(255),
    recipes_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    users_id VARCHAR(255),
    Foreign Key (users_id) REFERENCES users(users_id)
);

CREATE TABLE comments
(
    comment_id VARCHAR PRIMARY KEY,
    recipes_id VARCHAR(255),
    users_id VARCHAR(255),
    comment_text VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likeds
(
    likeds_id VARCHAR PRIMARY KEY,
    recipes_id VARCHAR(255),
    users_id VARCHAR(255)
);

CREATE TABLE bookmarks
(
    bookmarks_id Varchar PRIMARY KEY,
    recipes_id VARCHAR(255),
    users_id VARCHAR(255)
);

SELECT recipes.*,users.users_name FROM recipes JOIN users ON recipes.users_id = users.users_id;

SELECT likeds.*,recipes.* FROM likeds JOIN recipes ON likeds.recipes_id = recipes.recipes_id;

SELECT comments.*,users.* FROM comments JOIN users ON comments.users_id = users.users_id;
SELECT bookmarks.*,recipes.* FROM bookmarks JOIN recipes ON bookmarks.recipes_id = recipes.recipes_id;