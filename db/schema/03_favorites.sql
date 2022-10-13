DROP TABLE IF EXISTS favorites CASCADE;
create table favorites (
       products_id INT REFERENCES products(id) ON DELETE CASCADE,
       users_id INT REFERENCES users(id) ON DELETE CASCADE
);
