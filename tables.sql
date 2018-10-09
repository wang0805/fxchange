
CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	name TEXT,
	password TEXT,
	created_at TIMESTAMP DEFAULT now(),
);

CREATE TABLE IF NOT EXISTS orders (
	id SERIAL PRIMARY KEY,


);