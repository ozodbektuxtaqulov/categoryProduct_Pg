CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    description VARCHAR(55)
);

CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(22),
    price DECIMAL,
    quantity INT DEFAULT 0,
    category_id INT,
    FOREIGN KEY(category_id)  REFERENCES categories(id) 

) ;