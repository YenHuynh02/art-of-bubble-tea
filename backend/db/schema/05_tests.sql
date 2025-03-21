DROP TABLE IF EXISTS Tests CASCADE;

CREATE TABLE Tests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  brand_id INT NOT NULL,
  test_date DATE NOT NULL,
  note VARCHAR(255),
  FOREIGN KEY (brand_id) REFERENCES Brand_location(id) ON DELETE CASCADE
);