DROP TABLE IF EXISTS Drink_recipe CASCADE;

CREATE TABLE Drink_recipe (
  id INT AUTO_INCREMENT PRIMARY KEY,
  drink_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  recipe VARCHAR(255) NOT NULL,
  cup_size VARCHAR(255) NOT NULL,
  ice_level INT NOT NULL,
  FOREIGN KEY (drink_id) REFERENCES Drinks(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id) ON DELETE CASCADE
);