DROP TABLE IF EXISTS users CASCADE;
create table users (
	id SERIAL PRIMARY KEY NOT NULL,
	user_name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	profile_pic VARCHAR(50),
	bio VARCHAR(50) NOT NULL,
	seller BOOLEAN DEFAULT false
);



