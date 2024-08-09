import { faker } from '@faker-js/faker';
import connection from '../connection';

const initializeTestDatabase = async (table='test_users') => {
	// Create a test_table to not interfere with the actual data
	const queryString = `
    DROP TABLE IF EXISTS ${table};

    CREATE TABLE ${table} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    );`;

	try {
		await connection.query(queryString);
		console.log('Database initialized successfully');
	} catch (error) {
		console.error(`Error initialize db: `, error);
	}
};

const insertTestSeeds = async (table = 'test_users') => {
	// Insert random 1000 seeds to the table
	const queryString = `
    INSERT INTO ${table} (
      first_name,
      last_name,
      email
    )
    VALUES ?
  `;

	let users = [];
	for (let i = 0; i < 10000; i++) {
		const randomFirstName = faker.person.firstName();
		const randomLastName = faker.person.lastName();
		const randomEmail = faker.internet.email();
		users.push([randomFirstName, randomLastName, randomEmail]);
	}
	
	try {
		const result = await connection.query(queryString, [users]);
	} catch (error) {
		console.error(`Error inserting seeds: `, error);
	}
};

// Function to clean up by dropping the test table
const cleanupTestDatabase = async (table = 'test_users') => {
  const queryString = `
    DROP TABLE IF EXISTS ${table};
  `;

  try {
    await connection.query(queryString);
    console.log('Test database table dropped successfully');
  } catch (error) {
    console.error('Error dropping test database table:', error);
  } finally {
    // Close the connection pool
    connection.end();
  }
};

const performStressTest = async () => {
  await initializeTestDatabase();
  await insertTestSeeds();
  await cleanupTestDatabase();
};

// Run the stress test called from command line
(async () => {
  await performStressTest();
})();