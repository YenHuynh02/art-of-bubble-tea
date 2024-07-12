import { faker } from '@faker-js/faker';
import connection from './connection';

const initializeDatabase = async() => {
  const queryString=`
    DROP TABLE IF EXISTS users;

    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      UNIQUE (email)
    );`;

    try {
      await connection.query(queryString);
      console.log('Database initialized successfully');
    } catch (error) {
      console.error(`Error initialize db: `, error);
    }    
  }

const testSeeds = async() => {

  // Insert random 1000 seeds to the table
  const queryString = `
    INSERT INTO users (
      first_name,
      last_name,
      email
    )
    VALUES (?, ? ,?)
  `;
  
  for (let i = 0; i < 1000; i++) {
    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomEmail = faker.internet.email();
    
    const queryParams = [randomFirstName, randomLastName, randomEmail]; 

    try {
      const result = await connection.execute(queryString, queryParams);
    } catch(error) {
      console.error(`Error inserting seeds: `, error);
    }
  }

  // Delete seeds after inserting
  const queryStringDelete = `DELETE FROM users`;
  try {
    await connection.query(queryStringDelete);
  } catch (error) {
    console.error(`Error deleting seeds: `, error);
  }

  await connection.end();
}

export { 
  initializeDatabase, 
  testSeeds,
}

