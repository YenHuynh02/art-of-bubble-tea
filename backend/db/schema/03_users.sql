DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  brand_id INT NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(225) NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES Brand_location(id) ON DELETE CASCADE,
  UNIQUE(email)
);