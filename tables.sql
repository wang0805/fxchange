
CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	name TEXT,
	password TEXT,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS Orders (
	id SERIAL PRIMARY KEY,
	ticker TEXT,
	ordertype VARCHAR(10),
	price DECIMAL, 
	qty INT,
	orderstatus TEXT,
	user_id INT,
	created_at TIMESTAMP DEFAULT now(),
	updated_at TIMESTAMP

);

CREATE TABLE IF NOT EXISTS transactions(
	id SERIAL PRIMARY KEY,
	a_orderid INT,
	b_orderid INT,
	ticker TEXT,
	qty INT,
	price DECIMAL,
	created_at TIMESTAMP DEFAULT now()
)	